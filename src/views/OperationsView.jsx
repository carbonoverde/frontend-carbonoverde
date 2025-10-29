import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { getCompanies, createCompany } from "../services/api";

const CompanyRegisterView = () => {
  const [companies, setCompanies] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    dateRegistration: "",
    accumulatedCo2: 0,
    monthlyEnergyConsumption: 0,
    monthlyWaterConsumption: 0,
    monthlyWaste: 0,
    address: {
      cep: "",
      country: "Brasil",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao carregar empresas",
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [id]: value },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createCompany(formData);
      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Empresa cadastrada com sucesso!",
      });
      setVisible(false);
      loadCompanies();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao cadastrar empresa",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="text-3xl font-bold text-green-700">Empresas Cadastradas</h2>
        <Button
          label="Nova Empresa"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => setVisible(true)}
        />
      </div>

      <Card className="shadow-2 border-round-lg ">
        <DataTable
          value={companies}
          paginator
          rows={5}
          emptyMessage="Nenhuma empresa cadastrada ainda."
        >
          <Column field="name" header="Nome" />
          <Column field="cnpj" header="CNPJ" />
          <Column field="dateRegistration" header="Data Registro" />
          <Column field="accumulatedCo2" header="CO₂ (t)" />
          <Column field="monthlyEnergyConsumption" header="Energia (kWh)" />
          <Column field="monthlyWaterConsumption" header="Água (m³)" />
          <Column field="monthlyWaste" header="Resíduos (kg)" />
          <Column field="address.city" header="Cidade" />
        </DataTable>
      </Card>

      {/* Modal de cadastro */}
      <Dialog
        header="Cadastrar Nova Empresa"
        visible={visible}
        className="border-2 p-5"
        style={{ backgroundColor: "rgba(255, 255, 255, 1)", borderRadius: "1rem", width: "60vw" }}
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)" }}
        modal
        onHide={() => setVisible(false)}
      >
        <div className="flex flex-column gap-4" >
          <Divider align="left">
            <span className="text-lg font-semibold">Dados da Empresa</span>
          </Divider>

          <div className="grid">
            <div className="col-6">
              <label htmlFor="name" className="font-medium flex flex-col mb-1">Nome:</label>
              <InputText id="name" placeholder="Company LTDA.." value={formData.name} onChange={handleChange} className="w-full" style={{ boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
            <div className="col-6">
              <label htmlFor="cnpj" className="font-medium flex flex-col mb-1">CNPJ</label>
              <InputText id="cnpj" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={handleChange} className="w-full" style={{ boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "11rem", }} />
            </div>
            <div className="col-6">
              <label htmlFor="dateRegistration" className="font-medium flex flex-col">Data de Registro</label>
              <Calendar
                id="dateRegistration"
                value={formData.dateRegistration}
                onChange={(e) => setFormData({ ...formData, dateRegistration: e.value })}
                dateFormat="dd/mm/yy"
                placeholder="dd/mm/yy"
                className="w-full"
                 pt={{
                  panel: {
                    style: {
                      backgroundColor: '#fff',
                      color: '#333',
                      padding:"2px",
                      width: "14rem"
                    },
                  },
                }}
                style={{ borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem" }}
              />
            </div>
          </div>

          <Divider align="left">
            <span className="text-lg font-semibold">Consumo e Impacto</span>
          </Divider>

          <div className="grid">
            <div className="col-3">
              <label htmlFor="accumulatedCo2" className="font-medium flex flex-col mb-1">CO₂ Acumulado (t)</label>
              <InputNumber id="accumulatedCo2" value={formData.accumulatedCo2} onValueChange={(e) => setFormData({ ...formData, accumulatedCo2: e.value })} className="w-full" style={{ boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }} />
            </div>
            <div className="col-3">
              <label htmlFor="monthlyEnergyConsumption" className="font-medium flex flex-col mb-1">Energia (kWh)</label>
              <InputNumber id="monthlyEnergyConsumption" value={formData.monthlyEnergyConsumption} onValueChange={(e) => setFormData({ ...formData, monthlyEnergyConsumption: e.value })} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }} />
            </div>
            <div className="col-3">
              <label htmlFor="monthlyWaterConsumption" className="font-medium flex flex-col mb-1">Água (m³)</label>
              <InputNumber id="monthlyWaterConsumption" value={formData.monthlyWaterConsumption} onValueChange={(e) => setFormData({ ...formData, monthlyWaterConsumption: e.value })} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }} />
            </div>
            <div className="col-3">
              <label htmlFor="monthlyWaste" className="font-medium flex flex-col mb-1">Resíduos (kg)</label>
              <InputNumber id="monthlyWaste" value={formData.monthlyWaste} onValueChange={(e) => setFormData({ ...formData, monthlyWaste: e.value })} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
          </div>

          <Divider align="left">
            <span className="text-lg font-semibold">Endereço</span>
          </Divider>

          <div className="grid">
            <div className="col-3">
              <label htmlFor="cep" className="font-medium flex flex-col mb-1">CEP</label>
              <InputText id="cep" placeholder="Ex: 00000-000" value={formData.address.cep} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
            <div className="col-3">
              <label htmlFor="state" className="font-medium flex flex-col mb-1">Estado</label>
              <InputText id="state" placeholder="Ex: SC" value={formData.address.state} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
            <div className="col-3">
              <label htmlFor="city" className="font-medium flex flex-col mb-1">Cidade</label>
              <InputText id="city" placeholder="Ex: Joinville" value={formData.address.city} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
            <div className="col-3">
              <label htmlFor="neighborhood" className="font-medium flex flex-col mb-1">Bairro</label>
              <InputText id="neighborhood" placeholder="Ex: Boa vista" value={formData.address.neighborhood} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
            <div className="col-6">
              <label htmlFor="street" className="font-medium flex flex-col mb-1">Rua</label>
              <InputText id="street" placeholder="Ex: Avenida Padrinho Rocha" value={formData.address.street} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "16rem", }}/>
            </div>
            <div className="col-3">
              <label htmlFor="number" className="font-medium flex flex-col mb-1">Número</label>
              <InputText id="number" placeholder="Ex: 40" value={formData.address.number} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
            <div className="col-3">
              <label htmlFor="complement" className="font-medium flex flex-col mb-1">Complemento</label>
              <InputText id="complement" placeholder="Ex: Lateral da rua Boa vista" value={formData.address.complement} onChange={handleAddressChange} className="w-full" style={{boxShadow: 'none', outline: 'none', borderBottom: "1px solid black", padding: "2px", maxWidth: "10rem", }}/>
            </div>
          </div>

          <div className="flex justify-space-between mt-3 gap-3">
            <Button
              label="Cancelar"
              className="p-button-text mr-2 "
              onClick={() => setVisible(false)}
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              loading={loading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyRegisterView;
