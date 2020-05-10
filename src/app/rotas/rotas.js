module.exports = (app) => {

    const cheerio = require('cheerio')
    const request = require('request')
    const cors = require('cors');  

    
    app.get('/', cors(), (req, resp)=>{
        pegaDados()
            .then(dados => resp.json(dados))
            .catch(err => console.log(err))
          
    });   
    
    function pegaDados(){
        var dados = []

        return new Promise((resolve, reject)=>{
            request({
                method: 'GET',
                url: 'https://www.cercos.com.br/sis/bandeiras_tarifarias/'
            }, (err, res, body) => {            
                if (err) return reject('inacessivel');        

                let $ = cheerio.load(body)
                      
                for (let i = 1; i <= 12; i++) {
                    let ano = $(`#id_sc_field_ano_${i}`).text();
                    let mes = $(`#id_sc_field_mes_${i}`).text();
                    let bandeira = $(`#id_sc_field_bandeira_${i}`).text();
                    let fator = $(`#id_sc_field_valor_${i}`).text();
                   
                    dados.push({
                        ano: ano,
                        mes: mes,
                        bandeira: bandeira,
                        fator: fator
                    })                   
                }         
                console.log(dados);
                return resolve(dados);
            })

        });



        
    }
}