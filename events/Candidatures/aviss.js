const {EmbedBuilder} = require("discord.js")
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isSelectMenu()) return;

        //Avis Recrutement
        if (interaction.customId === 'aviss') {


            if (!interaction.member.roles.cache.find(role => role.id == client.config.role_support)) {

                interaction.reply({content:"Non",ephemeral:true})
                return
            }

            let neg =""
            let pos = ""

  

            if (await client.db.get(`tick_${interaction.channel.id}_${interaction.user.id}` ) === true){

      return interaction.reply({content:"Vous avez deja donnée votre avis",ephemeral: true})

            }

           let cassecouille = []
           let wouldstop = false

            interaction.values.forEach(element => {
                const lol = element.substring(9, element.lengh)

                const found = cassecouille.find(element => element === lol);

                if (found){
                    wouldstop = true
                }else{
                    cassecouille.push(lol)
                }
            })

            if (wouldstop){
                return interaction.reply({content:"Vous avez choisi les deux meme points positif / negatif (tkt je parle fr)",ephemeral: true})
            }


            
            interaction.values.forEach(element => {
                const lol = element.substring(5, 8)

                if (lol === "pos"){
                    client.config.aviss.forEach(ele => {
                        if (ele.value ===element) {
                            pos = pos+"\n- "+ ele.label
                        }
                    })
     
                }
                if (lol === "neg"){ 

                    client.config.aviss.forEach(ele => {
                        if (ele.value ===element) {
                        neg = neg+"\n- "+ ele.label
                     
                    }  
                    })            
                }      
            });
            const recrut = new EmbedBuilder()
                .setColor("#2f3136")
                .setTitle(`Avis du recrutement`)
                .setDescription(`Voici l\'avis deposé par ${interaction.member.nickname} `)
                .addFields([{
                    name: "Points positifs",
                    value: `${pos ? pos : "Aucun"}`
                },
                {
                    name: "Points negatifs",
                    value: `${neg ? neg : "Aucun"}`
                }
               
            ])
            .setTimestamp()
            .setFooter(client.config.footer);

            client.db.set(`tick_${interaction.channel.id}_${interaction.user.id}`, true)

                
            interaction.reply({embeds:[recrut]})
            // Avis recrutement Fin
        }
        if (interaction.customId === 'boncom') {
            let neg =""
            let pos = ""

            interaction.values.forEach(element => {
                const lol = element.substring(5, 8)
                if (lol === "tic"){ 

                    client.config.avis.forEach(ele => {
                        if (ele.value ===element) {
                        neg = neg+"\n- "+ ele.label
                     
                    }})            
                }      
                
            });
        }


    }}