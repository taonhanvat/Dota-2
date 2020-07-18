const axios = require("axios");

// const getHeroesAbilitiesName = (client) => {
//   return axios
//     .get("https://api.opendota.com/api/constants/ability_keys")
//     .then((res) => {
//       const allKeys = Object.keys(res.data);
//       return allKeys.filter((key) => key.indexOf("special") === -1);
//     });
// };

// const getDetailedHeroesAbilities = async (client) => {
//   const abilitiesName = await getHeroesAbilitiesName();
//   const detailedAbilites = await axios.get(
//     "https://api.opendota.com/api/constants/abilities"
//   );

//   const result = abilitiesName.map((name) => {
  
//     const detailed = detailedAbilites.data[name];
//     return {
//       ...detailed,
//       name,
//     };
//   });
//   for(let i = 0 ; i < result.length ; i++){
//     result[i].desc = result[i].desc.replace("'","''")
//   }
//   const getDataHero = async (client) => {
    
//     const a = client.query(
//       `SELECT * FROM heroes`,
//       (err, res) => {
//         let c = res.rows;
//         // console.log(c)
//         console.log(result)
//         // console.log(result[0])
//         for( let i = 0 ; i < result.length ; i++ ){
          
//           let index ;
//           c.forEach(element => {
//             if( result[i].name.indexOf(element.name.slice(14)) != -1 || result[i].name.indexOf(element.name.replace("_","")) != -1) index = element.id
//           })
//           insertAbilityDetailToDatabase(client , index , result[i].name , result[i].desc, result[i].img )
//         }
//       }
//     );
    
//     }
//     getDataHero(client);
 
//   // console.log(result)
  
// };
const insertAbilityDetailToDatabase = (client , id, name , describle , img ) => {

  client.query(
    `insert into detail_ability values (${id}, '${name}','${describle}','${img}')`,
    (err, res) => {
      // console.log(err, res);
    }
  );
}
// module.exports.getDetailedHeroesAbilities = getDetailedHeroesAbilities;
