import api from '../api/api'

export const Geolocations = {
 
// Lấy GPS hiện tại bằng địa chỉ
    getGPSByAddress: (address :string) => {
      return new Promise(async (resolve, reject) => {
          try {
            let newAddress = encodeURIComponent(`${address}`)
              const data = await api.getGPS(newAddress);
              const {features}=data
              if (features && features.length > 0) {
                // Nếu có locality thì dùng localtity
                const arrLocalityResults = features.filter((item:any)  => item.place_type.length > 0 && item.place_type[0] === 'locality');
                const arrAddressResults = features.filter((item:any) => item.place_type.length > 0 && item.place_type[0] === 'address');
                const arrPoiResults = features.filter((item:any) => item.place_type.length > 0 && item.place_type[0] === 'poi');

                if (arrLocalityResults.length > 0) {
                    resolve(arrLocalityResults[0]);

                } else if (arrAddressResults.length > 0) {
                    resolve(arrAddressResults[0]);

                } else if (arrPoiResults.length > 0) {
                    resolve(arrPoiResults[0]);

                } else {
                    throw new Error('Result locality, poi = 0');
                };

            } else {
                reject(new Error('Result Features = 0'));
            };

          } catch (error) {
              reject(error);
          };
      });
  },
    //convert GPS to Address
    getAddress:(params:any)=>{
        return new Promise(async (resolve,reject)=>{
          try {
            const response = await api.getLocation(params)
            resolve(response)
          } catch (error) {
            console.log("-----error-----",error)
          }
        })
      },
}

