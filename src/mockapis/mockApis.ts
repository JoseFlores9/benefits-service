export const getBenefitsBank = async(params: any[]): Promise<any[]> =>{
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'A1', benefit: 'Descuento en tiendas A', details: "30% de descuento", expirationDate: '2025-12-10' }
        ])
      }, 100)
    })
  }

export const getBenefitsTelco = async(params: any[]): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'B1', benefit: 'Promoción en servicios B', details: "Contrata dos planes y ten un 30% de descuento el segundo", expirationDate: '2025-12-10' }
        ])
      }, 150)
    })
  }

export const getSocialBenefits = async(params: any[]): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'C1', benefit: 'Reembolso en compras C', details: "te devolvemos un 20%", expirationDate: '2025-12-10' }
        ])
      }, 200)
    })
  }

