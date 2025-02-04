import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import knights from 'knights-canvas'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
const func = (await import('./function/system/function.js'))
const { 
proto,
generateWAMessage,
getAggregateVotesInPollMessage
 } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))
 
export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
        m.exp = 0
        m.limit = false
        try {
            // TODO: use loop to insert data instead of this
            let user = global.db.data.users[m.sender]
            if (typeof user !== "object")
                global.db.data.users[m.sender] = {}
            if (user) {
                if (!("BannedReason" in user)) user.BannedReason = ""
                if (!("Banneduser" in user)) user.Banneduser = false
                if (!("afkReason" in user)) user.afkReason = ""
                if (!("autolevelup" in user)) user.autolevelup = false
                if (!("banned" in user)) user.banned = false
                if (!("catatan" in user)) user.catatan = ""
                if (!("job" in user)) user.job = ""
                if (!("kingdom" in user)) user.kingdom = true
                if (!("misi" in user)) user.misi = ""
                if (!("pasangan" in user)) user.pasangan = ""
                if (!("partner" in user)) user.partner = ""
                if (!("premium" in user)) user.premium = false
                if (!("registered" in user)) user.registered = false
                if (!("rank" in user)) user.rank = "Pemula"
                if (!("role" in user)) user.role = "Pemula"
                if (!("title" in user)) user.title = ""
                if (!("sewa" in user)) user.sewa = false
                if (!("skill" in user)) user.skill = ""
                if (!("title" in user)) user.title = ""

                if (!user.registered) {
                    if (!("name" in user)) user.name = m.name
                    if (!isNumber(user.age)) user.age = -1
                    if (!isNumber(user.advenaglory)) user.advenaglory = 0
                    if (!isNumber(user.anggur)) user.anggur = 0
                    if (!isNumber(user.apel)) user.apel = 0
                    if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
                    if (!isNumber(user.bibitapel)) user.bibitapel = 0
                    if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
                    if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
                    if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
                    if (!isNumber(user.emas)) user.emas = 0
                    if (!isNumber(user.jeruk)) user.jeruk = 0
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!isNumber(user.makanan)) user.makanan = 0
                    if (!isNumber(user.mangga)) user.mangga = 0
                    if (!isNumber(user.pisang)) user.pisang = 0
                    if (!isNumber(user.premiumDate)) user.premiumDate = -1
                    if (!isNumber(user.regTime)) user.regTime = -1
                    if (!isNumber(user.semangka)) user.semangka = 0
                    if (!isNumber(user.stroberi)) user.stroberi = 0
                }


                if (!isNumber(user.afk)) user.afk = -1
                if (!user.organization) user.organization = {};
                if (!('name' in user.organization)) user.organization.name = '';
				if (!isNumber(user.organization.level)) user.organization.level = 0
				if (!('followers' in user.organization)) user.organization.followers = []
				if (!isNumber(user.organization.organizationsDestroyed))user.organization.organizationsDestroyed = 0			
				if (!isNumber(user.organization.followersDestroyed)) user.organization.followersDestroyed = 0
				if (!('alliances' in user.organization)) user.organization.alliances = ''
                if (!isNumber(user.agility)) user.agility = 0
                if (!isNumber(user.anakanjing)) user.anakanjing = 0
                if (!("anakname" in user)) user.anakname = ""
                if (!("anakgender" in user)) user.anakgender = ""
                if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
                if (!isNumber(user.anakgriffin)) user.anakgriffin = 0
                if (!isNumber(user.anakkucing)) user.anakkucing = 0
                if (!isNumber(user.anakkuda)) user.anakkuda = 0
                if (!isNumber(user.anakkyubi)) user.anakkyubi = 0
                if (!isNumber(user.anaknaga)) user.anaknaga = 0
                if (!isNumber(user.anakpancingan)) user.anakpancingan = 0
                if (!isNumber(user.anakphonix)) user.anakphonix = 0
                if (!isNumber(user.anakrubah)) user.anakrubah = 0
                if (!isNumber(user.anakserigala)) user.anakserigala = 0
                if (!isNumber(user.anggur)) user.anggur = 0
                if (!isNumber(user.anjing)) user.anjing = 0
                if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0
                if (!isNumber(user.antispam)) user.antispam = 0
                if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
                if (!isNumber(user.apel)) user.apel = 0
                if (!isNumber(user.aqua)) user.aqua = 0
                if (!isNumber(user.arc)) user.arc = 0
                if (!isNumber(user.arcdurability)) user.arcdurability = 0
                if (!isNumber(user.arlok)) user.arlok = 0
                if (!isNumber(user.armor)) user.armor = 0
                if (!isNumber(user.armordurability)) user.armordurability = 0
                if (!isNumber(user.armormonster)) user.armormonster = 0
                if (!isNumber(user.as)) user.as = 0
                if (!isNumber(user.atm)) user.atm = 0
                if (!isNumber(user.axe)) user.axe = 0
                if (!isNumber(user.axedurability)) user.axedurability = 0
                if (!isNumber(user.ayam)) user.ayam = 0
                if (!isNumber(user.ayamb)) user.ayamb = 0
                if (!isNumber(user.ayambakar)) user.ayambakar = 0
                if (!isNumber(user.ayamg)) user.ayamg = 0
                if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0
                if (!isNumber(user.babi)) user.babi = 0
                if (!isNumber(user.babihutan)) user.babihutan = 0
                if (!isNumber(user.babipanggang)) user.babipanggang = 0
                if (!isNumber(user.bandage)) user.bandage = 0
                if (!isNumber(user.bank)) user.bank = 0
                if (!isNumber(user.banteng)) user.banteng = 0
                if (!isNumber(user.batu)) user.batu = 0
                if (!isNumber(user.bawal)) user.bawal = 0
                if (!isNumber(user.bawalbakar)) user.bawalbakar = 0
                if (!isNumber(user.bayam)) user.bayam = 0
                if (!isNumber(user.berlian)) user.berlian = 10
                if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
                if (!isNumber(user.bibitapel)) user.bibitapel = 0
                if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
                if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
                if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
                if (!isNumber(user.botol)) user.botol = 0
                if (!isNumber(user.boostb)) user.boostb = 0
                if (!isNumber(user.boosta)) user.boosta = 0
                if (!isNumber(user.boosts)) user.boosts = 0
                if (!isNumber(user.boostk)) user.boostk = 0
                if (!isNumber(user.bow)) user.bow = 0
                if (!isNumber(user.bowdurability)) user.bowdurability = 0
                if (!isNumber(user.boxs)) user.boxs = 0
                if (!isNumber(user.brick)) user.brick = 0
                if (!isNumber(user.brokoli)) user.brokoli = 0
                if (!isNumber(user.buaya)) user.buaya = 0
                if (!isNumber(user.buntal)) user.buntal = 0
                if (!isNumber(user.cat)) user.cat = 0
                if (!isNumber(user.catexp)) user.catexp = 0
                if (!isNumber(user.catlastfeed)) user.catlastfeed = 0
                if (!isNumber(user.centaur)) user.centaur = 0
                if (!isNumber(user.centaurexp)) user.centaurexp = 0
                if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0
                if (!isNumber(user.centaurlastfeed)) user.centaurlastfeed = 0
                if (!isNumber(user.clay)) user.clay = 0
                if (!isNumber(user.coal)) user.coal = 0
                if (!isNumber(user.c1)) user.c1 = 0
                if (!isNumber(user.c2)) user.c2 = 0
                if (!isNumber(user.c3)) user.c3 = 0
                if (!isNumber(user.c4)) user.c4 = 0
                if (!isNumber(user.c5)) user.c5 = 0
                if (!isNumber(user.c6)) user.c6 = 0
                if (!isNumber(user.c7)) user.c7 = 0
                if (!isNumber(user.c8)) user.c8 = 0
                if (!isNumber(user.c9)) user.c9 = 0
                if (!isNumber(user.c10)) user.c10 = 0
                if (!isNumber(user.coin)) user.coin = 0
                if (!isNumber(user.common)) user.common = 0
                if (!isNumber(user.crystal)) user.crystal = 0
                if (!isNumber(user.cumi)) user.cumi = 0
                if (!isNumber(user.cupon)) user.cupon = 0
                if (!isNumber(user.diamond)) user.diamond = 0
                if (!isNumber(user.dog)) user.dog = 0
                if (!isNumber(user.dogexp)) user.dogexp = 0
                if (!isNumber(user.doglastfeed)) user.doglastfeed = 0
                if (!isNumber(user.dory)) user.dory = 0
                if (!isNumber(user.dragon)) user.dragon = 0
                if (!isNumber(user.drink)) user.drink = 0
                if (!isNumber(user.dragonexp)) user.dragonexp = 0
                if (!isNumber(user.dragonlastfeed)) user.dragonlastfeed = 0
                if (!isNumber(user.emas)) user.emas = 0
                if (!isNumber(user.elixirLevel)) user.elixirLevel = 0
                if (!isNumber(user.vitalityLevel)) user.vitalityLevel = 0
                if (!isNumber(user.esens)) user.esens = 0
                if (!isNumber(user.emerald)) user.emerald = 0
                if (!isNumber(user.enchant)) user.enchant = 0
                if (!isNumber(user.esteh)) user.esteh = 0
                if (!isNumber(user.exp)) user.exp = 0
                if (!isNumber(user.expg)) user.expg = 0
                if (!isNumber(user.exphero)) user.exphero = 0
                if (!isNumber(user.fishingrod)) user.fishingrod = 0
                if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
                if (!isNumber(user.fortress)) user.fortress = 0
                if (!isNumber(user.fox)) user.fox = 0
                if (!isNumber(user.foxexp)) user.foxexp = 0
                if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0
                if (!isNumber(user.fullatm)) user.fullatm = 0
                if (!isNumber(user.gadodado)) user.gadodado = 0
                if (!isNumber(user.gajah)) user.gajah = 0
                if (!isNumber(user.gamemines)) user.gamemines = false
                if (!isNumber(user.ganja)) user.ganja = 0
                if (!isNumber(user.gardenboxs)) user.gardenboxs = 0
                if (!isNumber(user.gems)) user.gems = 0
                if (!isNumber(user.glass)) user.glass = 0
                if (!isNumber(user.glimit)) user.glimit = 20
                if (!isNumber(user.glory)) user.glory = 0
                if (!isNumber(user.gold)) user.gold = 0
                if (!isNumber(user.griffin)) user.griffin = 0
                if (!isNumber(user.griffinexp)) user.griffinexp = 0
                if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
                if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0
                if (!isNumber(user.gulai)) user.gulai = 0
                if (!isNumber(user.gurita)) user.gurita = 0
                if (!isNumber(user.harimau)) user.harimau = 0
                if (!isNumber(user.haus)) user.haus = 100
                if (!isNumber(user.healt)) user.healt = 200
                if (!isNumber(user.health)) user.health = 200
                if (!isNumber(user.healthmonster)) user.healthmonster = 0
                if (!isNumber(user.healtmonster)) user.healtmonster = 0
                if (!isNumber(user.hero)) user.hero = 1
                if (!isNumber(user.herolastclaim)) user.herolastclaim = 0
                if (!isNumber(user.hiu)) user.hiu = 0
                if (!isNumber(user.horse)) user.horse = 0
                if (!isNumber(user.horseexp)) user.horseexp = 0
                if (!isNumber(user.horselastfeed)) user.horselastfeed = 0
                if (!isNumber(user.ikan)) user.ikan = 0
                if (!isNumber(user.ikanbakar)) user.ikanbakar = 0
                if (!isNumber(user.intelligence)) user.intelligence = 0
                if (!isNumber(user.iron)) user.iron = 0
                if (!isNumber(user.jagung)) user.jagung = 0
                if (!isNumber(user.jagungbakar)) user.jagungbakar = 0
                if (!isNumber(user.jeruk)) user.jeruk = 0
                if (!isNumber(user.joinlimit)) user.joinlimit = 1
                if (!isNumber(user.judilast)) user.judilast = 0
                if (!isNumber(user.kaleng)) user.kaleng = 0
                if (!isNumber(user.kambing)) user.kambing = 0
                if (!isNumber(user.kangkung)) user.kangkung = 0
                if (!isNumber(user.kapak)) user.kapak = 0
                if (!isNumber(user.kardus)) user.kardus = 0
                if (!isNumber(user.katana)) user.katana = 0
                if (!isNumber(user.katanadurability)) user.katanadurability = 0
                if (!isNumber(user.kayu)) user.kayu = 0
                if (!isNumber(user.kentang)) user.kentang = 0
                if (!isNumber(user.kentanggoreng)) user.kentanggoreng = 0
                if (!isNumber(user.kepiting)) user.kepiting = 0
                if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0
                if (!isNumber(user.kerbau)) user.kerbau = 0
                if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0
                if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0
                if (!isNumber(user.kerjadua)) user.kerjadua = 0
                if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0
                if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0
                if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0
                if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0
                if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0
                if (!isNumber(user.kerjadualima)) user.kerjadualima = 0
                if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0
                if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0
                if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0
                if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0
                if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0
                if (!isNumber(user.kerjaempat)) user.kerjaempat = 0
                if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0
                if (!isNumber(user.kerjaenam)) user.kerjaenam = 0
                if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0
                if (!isNumber(user.kerjalima)) user.kerjalima = 0
                if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0
                if (!isNumber(user.kerjasatu)) user.kerjasatu = 0
                if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0
                if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0
                if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0
                if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0
                if (!isNumber(user.kerjatiga)) user.kerjatiga = 0
                if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0
                if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0
                if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0
                if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0
                if (!isNumber(user.korbanngocok)) user.korbanngocok = 0
                if (!isNumber(user.kubis)) user.kubis = 0
                if (!isNumber(user.kucing)) user.kucing = 0
                if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                if (!isNumber(user.kuda)) user.kuda = 0
                if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
                if (!isNumber(user.kyubi)) user.kyubi = 0
                if (!isNumber(user.kyubiexp)) user.kyubiexp = 0
                if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0
                if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0
                if (!isNumber(user.labu)) user.labu = 0
                if (!isNumber(user.laper)) user.laper = 100
                if (!isNumber(user.lastBirth)) user.lastBirth = 0
                if (!isNumber(user.lastperisai)) user.lastperisai = 0
                if (!isNumber(user.lastadventure)) user.lastadventure = 0
                if (!isNumber(user.lastsport)) user.lastsport = 0
                if (!isNumber(user.lastbansos)) user.lastbansos = 0
                if (!isNumber(user.lastberbru)) user.lastberbru = 0
                if (!isNumber(user.lastberkebun)) user.lastberkebun = 0
                if (!isNumber(user.lastbunga)) user.lastbunga = 0
                if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0
                if (!isNumber(user.lastclaim)) user.lastclaim = 0
                if (!isNumber(user.lastcode)) user.lastcode = 0
                if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
                if (!isNumber(user.lastcrusade)) user.lastcrusade = 0
                if (!isNumber(user.lastdagang)) user.lastdagang = 0
                if (!isNumber(user.lastduel)) user.lastduel = 0
                if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                if (!isNumber(user.lasteasy)) user.lasteasy = 0
                if (!isNumber(user.lastfight)) user.lastfight = 0
                if (!isNumber(user.lastfishing)) user.lastfishing = 0
                if (!isNumber(user.lastgift)) user.lastgift = 0
                if (!isNumber(user.lastgojek)) user.lastgojek = 0
                if (!isNumber(user.lastgrab)) user.lastgrab = 0
                if (!isNumber(user.lasthourly)) user.lasthourly = 0
                if (!isNumber(user.lasthunt)) user.lasthunt = 0
                if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0
                if (!isNumber(user.lastjb)) user.lastjb = 0
                if (!isNumber(user.lastkill)) user.lastkill = 0
                if (!isNumber(user.lastlink)) user.lastlink = 0
                if (!isNumber(user.lastlumber)) user.lastlumber = 0
                if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0
                if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0
                if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0
                if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0
                if (!isNumber(user.lastmining)) user.lastmining = 0
                if (!isNumber(user.lastmisi)) user.lastmisi = 0
                if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
                if (!isNumber(user.lastmulung)) user.lastmulung = 0
                if (!isNumber(user.lastnambang)) user.lastnambang = 0
                if (!isNumber(user.lastnebang)) user.lastnebang = 0
                if (!isNumber(user.lastngocok)) user.lastngocok = 0
                if (!isNumber(user.lastngojek)) user.lastngojek = 0
                if (!isNumber(user.lastlk)) user.lastlk = 0
                if (!isNumber(user.lastob)) user.lastob = 0
                if (!isNumber(user.lastberburu)) user.lastberburu = 0
                if (!isNumber(user.lastopen)) user.lastopen = 0
                if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0
                if (!isNumber(user.lastmerkosa)) user.lastmerkosa = 0
                if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0
                if (!isNumber(user.lastrampok)) user.lastrampok = 0
                if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0
                if (!isNumber(user.lastrob)) user.lastrob = 0
                if (!isNumber(user.lastroket)) user.lastroket = 0
                if (!isNumber(user.lastsda)) user.lastsda = 0
                if (!isNumber(user.lastseen)) user.lastseen = 0
                if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0
                if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0
                if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0
                if (!isNumber(user.laststringclaim)) user.laststringclaim = 0
                if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0
                if (!isNumber(user.lastturu)) user.lastturu = 0
                if (!isNumber(user.lastwar)) user.lastwar = 0
                if (!isNumber(user.lastwarpet)) user.lastwarpet = 0
                if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0
                if (!isNumber(user.lastweekly)) user.lastweekly = 0
                if (!isNumber(user.lastwork)) user.lastwork = 0
                if (!isNumber(user.legendary)) user.legendary = 0
                if (!isNumber(user.lele)) user.lele = 0
                if (!isNumber(user.leleb)) user.leleb = 0
                if (!isNumber(user.lelebakar)) user.lelebakar = 0
                if (!isNumber(user.leleg)) user.leleg = 0
                if (!isNumber(user.level)) user.level = 0
                if (!isNumber(user.limit)) user.limit = 40
                if (!isNumber(user.pengeluaran)) user.pengeluaran = 0 
                if (!isNumber(user.limitjoinfree)) user.limitjoinfree = 1
                if (!isNumber(user.lion)) user.lion = 0
                if (!isNumber(user.lionexp)) user.lionexp = 0
                if (!isNumber(user.lionlastfeed)) user.lionlastfeed = 0
                if (!isNumber(user.lobster)) user.lobster = 0
                if (!isNumber(user.lumba)) user.lumba = 0
                if (!isNumber(user.magicwand)) user.magicwand = 0
                if (!isNumber(user.magicwanddurability)) user.magicwanddurability = 0
                if (!isNumber(user.makanancentaur)) user.makanancentaur = 0
                if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
                if (!isNumber(user.makanankyubi)) user.makanankyubi = 0
                if (!isNumber(user.makanannaga)) user.makanannaga = 0
                if (!isNumber(user.makananpet)) user.makananpet = 0
                if (!isNumber(user.makananphonix)) user.makananphonix = 0
                if (!isNumber(user.makananserigala)) user.makananserigala = 0
                if (!isNumber(user.mana)) user.mana = 0
                if (!isNumber(user.manar)) user.manar = 0
                if (!isNumber(user.mangga)) user.mangga = 0
                if (!isNumber(user.money)) user.money = 0
                if (!isNumber(user.monyet)) user.monyet = 0
                if (!isNumber(user.mythic)) user.mythic = 0
                if (!isNumber(user.naga)) user.naga = 0
                if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
                if (!isNumber(user.net)) user.net = 0
                if (!isNumber(user.nila)) user.nila = 0
                if (!isNumber(user.nilabakar)) user.nilabakar = 0
                if (!isNumber(user.ojekk)) user.ojekk = 0
                if (!isNumber(user.oporayam)) user.oporayam = 0
                if (!isNumber(user.orca)) user.orca = 0
                if (!isNumber(user.pancing)) user.pancing = 0
                if (!isNumber(user.pancingan)) user.pancingan = 1
                if (!isNumber(user.panda)) user.panda = 0
                if (!isNumber(user.paus)) user.paus = 0
                if (!isNumber(user.pausbakar)) user.pausbakar = 0
                if (!isNumber(user.pc)) user.pc = 0
                if (!isNumber(user.pepesikan)) user.pepesikan = 0
                if (!isNumber(user.pertambangan)) user.pertambangan = 0
                if (!isNumber(user.pertanian)) user.pertanian = 0
                if (!isNumber(user.pet)) user.pet = 0
                if (!isNumber(user.petFood)) user.petFood = 0
                if (!isNumber(user.phonix)) user.phonix = 0
                if (!isNumber(user.phonixexp)) user.phonixexp = 0
                if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
                if (!isNumber(user.phonixlastfeed)) user.phonixlastfeed = 0
                if (!isNumber(user.pickaxe)) user.pickaxe = 0
                if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                if (!isNumber(user.pillhero)) user.pillhero = 0
                if (!isNumber(user.pisang)) user.pisang = 0
                if (!isNumber(user.pointxp)) user.pointxp = 0
                if (!isNumber(user.potion)) user.potion = 0
                if (!isNumber(user.psenjata)) user.psenjata = 0
                if (!isNumber(user.psepick)) user.psepick = 0
                if (!isNumber(user.ramuan)) user.ramuan = 0
                if (!isNumber(user.ramuancentaurlast)) user.ramuancentaurlast = 0
                if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0
                if (!isNumber(user.ramuanherolast)) user.ramuanherolast = 0
                if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0
                if (!isNumber(user.ramuankudalast)) user.ramuankudalast = 0
                if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0
                if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0
                if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0
                if (!isNumber(user.ramuanrubahlast)) user.ramuanrubahlast = 0
                if (!isNumber(user.ramuanserigalalast)) user.ramuanserigalalast = 0
                if (!isNumber(user.reglast)) user.reglast = 0
                if (!isNumber(user.rendang)) user.rendang = 0
                if (!isNumber(user.rhinoceros)) user.rhinoceros = 0
                if (!isNumber(user.rhinocerosexp)) user.rhinocerosexp = 0
                if (!isNumber(user.rhinoceroslastfeed)) user.rhinoceroslastfeed = 0
                if (!isNumber(user.robo)) user.robo = 0
                if (!isNumber(user.roboxp)) user.roboxp = 0
                if (!isNumber(user.rock)) user.rock = 0
                if (!isNumber(user.roket)) user.roket = 0
                if (!isNumber(user.roti)) user.roti = 0
                if (!isNumber(user.rubah)) user.rubah = 0
                if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
                if (!isNumber(user.rumahsakit)) user.rumahsakit = 0
                if (!isNumber(user.sampah)) user.sampah = 0
                if (!isNumber(user.sand)) user.sand = 0
                if (!isNumber(user.sapi)) user.sapi = 0
                if (!isNumber(user.sapir)) user.sapir = 0
                if (!isNumber(user.seedbayam)) user.seedbayam = 0
                if (!isNumber(user.seedbrokoli)) user.seedbrokoli = 0
                if (!isNumber(user.seedjagung)) user.seedjagung = 0
                if (!isNumber(user.seedkangkung)) user.seedkangkung = 0
                if (!isNumber(user.seedkentang)) user.seedkentang = 0
                if (!isNumber(user.seedkubis)) user.seedkubis = 0
                if (!isNumber(user.seedlabu)) user.seedlabu = 0
                if (!isNumber(user.seedtomat)) user.seedtomat = 0
                if (!isNumber(user.seedwortel)) user.seedwortel = 0
                if (!isNumber(user.serigala)) user.serigala = 0
                if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0
                if (!isNumber(user.shield)) user.shield = false
                if (!isNumber(user.skillexp)) user.skillexp = 0
                if (!isNumber(user.snlast)) user.snlast = 0
                if (!isNumber(user.soda)) user.soda = 0
                if (!isNumber(user.sop)) user.sop = 0
                if (!isNumber(user.spammer)) user.spammer = 0
                if (!isNumber(user.spinlast)) user.spinlast = 0
                if (!isNumber(user.ssapi)) user.ssapi = 0
                if (!isNumber(user.stamina)) user.stamina = 200
                if (!isNumber(user.steak)) user.steak = 0
                if (!isNumber(user.stick)) user.stick = 0
                if (!isNumber(user.strength)) user.strength = 0
                if (!isNumber(user.string)) user.string = 0
                if (!isNumber(user.slayerglory)) user.slayerglory = 0
                if (!isNumber(user.skilladventure)) user.skilladventure = 0             
                if (!isNumber(user.skillgardening)) user.skillgardening = 0
                if (!isNumber(user.skillfishing)) user.skillfishing = 0
                if (!isNumber(user.skillsport)) user.skillsport = 0             
                if (!isNumber(user.superior)) user.superior = 0
                if (!isNumber(user.suplabu)) user.suplabu = 0
                if (!isNumber(user.sushi)) user.sushi = 0
                if (!isNumber(user.sword)) user.sword = 0
                if (!isNumber(user.sworddurability)) user.sworddurability = 0
                if (!isNumber(user.tigame)) user.tigame = 50
                if (!isNumber(user.tiketcoin)) user.tiketcoin = 0
                if (!isNumber(user.tomat)) user.tomat = 0
                if (!isNumber(user.tprem)) user.tprem = 0
                if (!isNumber(user.trash)) user.trash = 0
                if (!isNumber(user.trofi)) user.trofi = 0
                if (!isNumber(user.troopcamp)) user.troopcamp = 0
                if (!isNumber(user.tumiskangkung)) user.tumiskangkung = 0
                if (!isNumber(user.udang)) user.udang = 0
                if (!isNumber(user.udangbakar)) user.udangbakar = 0
                if (!isNumber(user.umpan)) user.umpan = 0
                if (!isNumber(user.uncommon)) user.uncommon = 0
                if (!isNumber(user.unreglast)) user.unreglast = 0
                if (!isNumber(user.upgrader)) user.upgrader = 0
                if (!isNumber(user.vodka)) user.vodka = 0
                if (!isNumber(user.wallet)) user.wallet = 0
                if (!isNumber(user.warn)) user.warn = 0
                if (!isNumber(user.weapon)) user.weapon = 0
                if (!isNumber(user.weapondurability)) user.weapondurability = 0
                if (!isNumber(user.wolf)) user.wolf = 0
                if (!isNumber(user.wolfexp)) user.wolfexp = 0
                if (!isNumber(user.wolflastfeed)) user.wolflastfeed = 0
                if (!isNumber(user.wood)) user.wood = 0
                if (!isNumber(user.wortel)) user.wortel = 0                
    if (!isNumber(user.hargadiri)) user.hargadiri = 0
    if (!isNumber(user.lastsex)) user.lastsex = 0
    if (!isNumber(user.c1)) user.c1 = 0
    if (!isNumber(user.c2)) user.c2 = 0
    if (!isNumber(user.c3)) user.c3 = 0
    if (!isNumber(user.c4)) user.c4 = 0
    if (!isNumber(user.c5)) user.c5 = 0
    if (!isNumber(user.c6)) user.c6 = 0
    if (!isNumber(user.c7)) user.c7 = 0
    if (!isNumber(user.c8)) user.c8 = 0
    if (!isNumber(user.c9)) user.c9 = 0
    if (!isNumber(user.c10)) user.c10 = 0
    if (!isNumber(user.hp)) user.hp = 0
    if (!isNumber(user.monitor)) user.monitor = 0
    if (!isNumber(user.mb)) user.mb = 0
    if (!isNumber(user.internet)) user.internet = 0
    if (!isNumber(user.tipeyt)) user.tipeyt = 0
    if (!isNumber(user.skillyt)) user.skillyt = 0
    if (!isNumber(user.mak)) user.mak = 0
    if (!isNumber(user.ssds)) user.ssds = 0
    if (!isNumber(user.ram)) user.ram = 0
    if (!isNumber(user.gpu)) user.gpu = 0
    if (!isNumber(user.cpu)) user.cpu = 0
    if (!isNumber(user.se)) user.se = 0
    if (!isNumber(user.kamera)) user.kamera = 0
    if (!isNumber(user.pencahayaan)) user.pencahayaan = 0
    if (!isNumber(user.viewer)) user.viewer = 0
    if (!isNumber(user.like)) user.like = 0
    if (!isNumber(user.dislike)) user.dislike = 0
    if (!isNumber(user.subscriber)) user.subscriber = 0
    if (!isNumber(user.showtime)) user.showtime = 0
    if (!isNumber(user.monet)) user.monet = 0
    if (!isNumber(user.video)) user.video = 0
    if (!isNumber(user.lastup)) user.lastup = 0
    if (!isNumber(user.mie)) user.mie = 0
    if (!isNumber(user.telur)) user.telur = 0
    if (!isNumber(user.bawangmerah)) user.bawangmerah = 0
    if (!isNumber(user.bawangputih)) user.bawangputih = 0
    if (!isNumber(user.kecap)) user.kecap = 0
    if (!isNumber(user.garam)) user.garam = 0
    if (!isNumber(user.saostiram)) user.saostiram = 0
    if (!isNumber(user.merica)) user.merica = 0
    if (!isNumber(user.air)) user.air = 0
    if (!isNumber(user.mieayam)) user.mieayam = 0
    if (!isNumber(user.ruko)) user.ruko = 0
    if (!isNumber(user.daunbawang)) user.daunbawang = 0
    if (!isNumber(user.pajak)) user.pajak = 0;
if (!isNumber(user.os)) user.os = 0;
if (!isNumber(user.diperkosa)) user.diperkosa = 0;
if (!isNumber(user.memperkosa)) user.memperkosa = 0;
if (!isNumber(user.levelhunter)) user.levelhunter = 0;
if (!("skill" in user)) user.skill = ""
if (!isNumber(user.horizonglory)) user.horizonglory = 0;
if (!isNumber(user.ravennaglory)) user.ravennaglory = 0;
if (!isNumber(user.apocalypseglory)) user.apocalypseglory = 0;
if (!isNumber(user.sakanaglory)) user.sakanaglory = 0;
if (!isNumber(user.kazariteglory)) user.kazariteglory = 0;
if (!("chname" in user)) user.chname = ""
if (!isNumber(user.skillsportl)) user.skillsportl = 0;
if (!isNumber(user.plastikpvc)) user.plastikpvc = 0;
if (!isNumber(user.semikonduktor)) user.semikonduktor = 0;
if (!isNumber(user.osr)) user.osr = 0;
if (!isNumber(user.minyak)) user.minyak = 0;
if (!isNumber(user.susu)) user.susu = 0;
if (!isNumber(user.pisanggoreng)) user.pisanggoreng = 0;
if (!isNumber(user.jusmangga)) user.jusmangga = 0;
if (!isNumber(user.gulaiayam)) user.gulaiayam = 0;
if (!isNumber(user.invest)) user.invest = 0;
if (!isNumber(user.investProfit)) user.investProfit = 0;
if (!isNumber(user.investExpiration)) user.investExpiration = 0;
if (!isNumber(user.timeShifterLevel)) user.timeShifterLevel = 0;
if (!isNumber(user.astralEssence)) user.astralEssence = 100;
if (!isNumber(user.pity5Star)) user.pity5Star = 0;
if (!isNumber(user.pity4Star)) user.pity4Star = 0;
if (!isNumber(user.pity3Star)) user.pity3Star = 0;
if (!user.wishHistory) user.wishHistory = []
if (!user.husbu) user.husbu = []
if (!user.waifu) user.waifu = []
if (!user.loli) user.loli = []
if (!user.milf) user.milf = []
if (!user.furry) user.furry = []
if (!('nickname' in user)) user.nickname = ''

                if (!user.lbars) user.lbars = "[▒▒▒▒▒▒▒▒▒]"
                if (!user.job) user.job = "Pengangguran"
                if (!user.premium) user.premium = false
                if (!user.premiumTime) user.premiumTime = 0
                if (!user.rtrofi) user.rtrofi = "Perunggu"
            } else
                global.db.data.users[m.sender] = {
                    afk: -1,
                    afkReason: "",
                    age: -1,
                    agility: 16,
                    advenaglory: 0,
                    anakgender: "",
                    anakname: "",
                    nickname: "",
                    title: "",
                    role: "Pemula",
                    rank: "Pemula",
                    anakanjing: 0,
                    anakcentaur: 0,
                    anakgriffin: 0,
                    anakkucing: 0,
                    anakkuda: 0,
                    anakkyubi: 0,
                    anaknaga: 0,
                    anakpancingan: 0,
                    anakphonix: 0,
                    anakrubah: 0,
                    anakserigala: 0,
                    anggur: 0,
                    anjing: 0,
                    anjinglastclaim: 0,
                    antispam: 0,
                    antispamlastclaim: 0,
                    apel: 0,
                    aqua: 0,
                    arc: 0,
                    arcdurability: 0,
                    arlok: 0,
                    armor: 0,
                    armordurability: 0,
                    armormonster: 0,
                    as: 0,
                    atm: 0,
                    autolevelup: false,
                    axe: 0,
                    axedurability: 0,
                    ayam: 0,
                    ayamb: 0,
                    ayambakar: 0,
                    ayamg: 0,
                    ayamgoreng: 0,
                    babi: 0,
                    babihutan: 0,
                    babipanggang: 0,
                    bandage: 0,
                    bank: 0,
                    banned: false,
                    BannedReason: "",
                    Banneduser: false,
                    banteng: 0,
                    batu: 0,
                    bawal: 0,
                    bawalbakar: 0,
                    bayam: 0,
                    berlian: 100,
                    bibitanggur: 0,
                    bibitapel: 0,
                    bibitjeruk: 0,
                    bibitmangga: 0,
                    bibitpisang: 0,
                    botol: 0,
                    bow: 0,
                    boostb: 0,
                    boosta: 0,
                    boosts: 0,
                    boostk: 0,
                    bowdurability: 0,
                    boxs: 0,
                    brick: 0,
                    brokoli: 0,
                    buaya: 0,
                    buntal: 0,
                    cat: 0,
                    catlastfeed: 0,
                    catngexp: 0,
                    centaur: 0,
                    centaurexp: 0,
                    centaurlastclaim: 0,
                    centaurlastfeed: 0,
                    clay: 0,
                    coal: 0,
                    coin: 0,
                    common: 0,
                    crystal: 0,
                    cumi: 0,
                    cupon: 0,
                    diamond: 0,
                    dog: 0,
                    dogexp: 0,
                    doglastfeed: 0,
                    dory: 0,
                    dragon: 0,
                    drink: 0,
                    dragonexp: 0,
                    dragonlastfeed: 0,
                    emas: 0,
                    elixirLevel: 0,
                    vitalityLevel: 0,
                    esens: 0,
                    emerald: 0,
                    esteh: 0,
                    exp: 0,
                    expg: 0,
                    exphero: 0,
                    expired: 0,
                    fishingrod: 0,
                    fishingroddurability: 0,
                    fortress: 0,
                    fox: 0,
                    foxexp: 0,
                    foxlastfeed: 0,
                    fullatm: 0,
                    gadodado: 0,
                    gajah: 0,
                    gamemines: false,
                    ganja: 0,
                    gardenboxs: 0,
                    gems: 0,
                    glass: 0,
                    gold: 0,
                    griffin: 0,
                    griffinexp: 0,
                    griffinlastclaim: 0,
                    griffinlastfeed: 0,
                    gulai: 0,
                    gurita: 0,
                    harimau: 0,
                    haus: 100,
                    healt: 200,
                    health: 200,
                    healtmonster: 100,
                    hero: 1,
                    herolastclaim: 0,
                    hiu: 0,
                    horse: 0,
                    horseexp: 0,
                    horselastfeed: 0,
                    ikan: 0,
                    ikanbakar: 0,
                    intelligence: 10,
                    iron: 0,
                    jagung: 0,
                    jagungbakar: 0,
                    jeruk: 0,
                    job: "Pengangguran",
                    joinlimit: 1,
                    judilast: 0,
                    kaleng: 0,
                    kambing: 0,
                    kangkung: 0,
                    kapak: 0,
                    kardus: 0,
                    katana: 0,
                    katanadurability: 0,
                    kayu: 0,
                    kentang: 0,
                    kentanggoreng: 0,
                    kepiting: 0,
                    kepitingbakar: 0,
                    kerbau: 0,
                    kerjadelapan: 0,
                    kerjadelapanbelas: 0,
                    kerjadua: 0,
                    kerjaduabelas: 0,
                    kerjaduadelapan: 0,
                    kerjaduadua: 0,
                    kerjaduaempat: 0,
                    kerjaduaenam: 0,
                    kerjadualima: 0,
                    kerjaduapuluh: 0,
                    kerjaduasatu: 0,
                    kerjaduasembilan: 0,
                    kerjaduatiga: 0,
                    kerjaduatujuh: 0,
                    kerjaempat: 0,
                    kerjaempatbelas: 0,
                    kerjaenam: 0,
                    kerjaenambelas: 0,
                    kerjalima: 0,
                    kerjalimabelas: 0,
                    kerjasatu: 0,
                    kerjasebelas: 0,
                    kerjasembilan: 0,
                    kerjasembilanbelas: 0,
                    kerjasepuluh: 0,
                    kerjatiga: 0,
                    kerjatigabelas: 0,
                    kerjatigapuluh: 0,
                    kerjatujuh: 0,
                    kerjatujuhbelas: 0,
                    korbanngocok: 0,
                    kubis: 0,
                    kucing: 0,
                    kucinglastclaim: 0,
                    kuda: 0,
                    kudalastclaim: 0,
                    kumba: 0,
                    kyubi: 0,
                    kyubilastclaim: 0,
                    labu: 0,
                    laper: 100,
                    lastBirth: 0,
                    lastadventure: 0,
                    lastperisai: 0,
                    lastsport: 0,
                    lastberbru: 0,
                    lastberkebun: 0,
                    lastbunga: 0,
                    lastbunuhi: 0,
                    lastclaim: 0,
                    lastcode: 0,
                    lastcrusade: 0,
                    lastdagang: 0,
                    lastduel: 0,
                    lastdungeon: 0,
                    lasteasy: 0,
                    lastfight: 0,
                    lastfishing: 0,
                    lastgojek: 0,
                    lastgrab: 0,
                    lasthourly: 0,
                    lasthunt: 0,
                    lastjb: 0,
                    lastkill: 0,
                    lastlink: 0,
                    lastlumber: 0,
                    lastmancingeasy: 0,
                    lastmancingextreme: 0,
                    lastmancinghard: 0,
                    lastmancingnormal: 0,
                    lastmining: 0,
                    lastmisi: 0,
                    lastberburu: 0,
                    lastmerkosa: 0,
                    lastmonthly: 0,
                    lastmulung: 0,
                    lastnambang: 0,
                    lastnebang: 0,
                    lastngocok: 0,
                    lastngojek: 0,
                    lastopen: 0,
                    lastpekerjaan: 0,
                    lastpotionclaim: 0,
                    lastramuanclaim: 0,
                    lastrob: 0,
                    lastroket: 0,
                    lastseen: 0,
                    lastSetStatus: 0,
                    lastsironclaim: 0,
                    lastsmancingclaim: 0,
                    laststringclaim: 0,
                    lastswordclaim: 0,
                    lastturu: 0,
                    lastwarpet: 0,
                    lastweaponclaim: 0,
                    lastweekly: 0,
                    lastwork: 0,
                    lbars: "[▒▒▒▒▒▒▒▒▒]",
                    legendary: 0,
                    lele: 0,
                    leleb: 0,
                    lelebakar: 0,
                    leleg: 0,
                    level: 0,
                    limit: 40,
                    limitjoinfree: 1,
                    lion: 0,
                    lionexp: 0,
                    lionlastfeed: 0,
                    lobster: 0,
                    lumba: 0,
                    magicwand: 0,
                    magicwanddurability: 0,
                    makanan: 0,
                    makanancentaur: 0,
                    makanangriffin: 0,
                    makanankyubi: 0,
                    makanannaga: 0,
                    makananpet: 0,
                    makananphonix: 0,
                    makananserigala: 0,
                    mana: 20,
                    manar: 20,
                    mangga: 0,
                    misi: "",                  
                    money: 0,
                    monyet: 0,
                    mythic: 0,
                    naga: 0,
                    nagalastclaim: 0,
                    name: m.name,
                    net: 0,
                    nila: 0,
                    nilabakar: 0,
                    catatan: "",
                    ojekk: 0,
                    oporayam: 0,
                    orca: 0,
                    partner: "",
                    pancingan: 1,
                    panda: 0,
                    pasangan: "",
                    paus: 0,
                    pausbakar: 0,
                    pc: 0,
                    pepesikan: 0,
                    pengeluaran: 0,
                    pet: 0,
                    phonix: 0,
                    phonixexp: 0,
                    phonixlastclaim: 0,
                    phonixlastfeed: 0,
                    pickaxe: 0,
                    pickaxedurability: 0,
                    pillhero: 0,
                    pisang: 0,
                    pointxp: 0,
                    potion: 10,
                    premium: false,
                    premiumTime: 0,
                    ramuan: 0,
                    ramuancentaurlast: 0,
                    ramuangriffinlast: 0,
                    ramuanherolast: 0,
                    ramuankucinglast: 0,
                    ramuankudalast: 0,
                    ramuankyubilast: 0,
                    ramuannagalast: 0,
                    ramuanphonixlast: 0,
                    ramuanrubahlast: 0,
                    ramuanserigalalast: 0,
                    registered: false,
                    reglast: 0,
                    regTime: -1,
                    rendang: 0,
                    rhinoceros: 0,
                    rhinocerosexp: 0,
                    rhinoceroslastfeed: 0,
                    rock: 0,
                    roket: 0,
                    roti: 0,
                    rtrofi: "perunggu",
                    rubah: 0,
                    rubahlastclaim: 0,
                    rumahsakit: 0,
                    sampah: 0,
                    sand: 0,
                    sapi: 0,
                    sapir: 0,
                    seedbayam: 0,
                    seedbrokoli: 0,
                    seedjagung: 0,
                    seedkangkung: 0,
                    seedkentang: 0,
                    seedkubis: 0,
                    seedlabu: 0,
                    seedtomat: 0,
                    seedwortel: 0,
                    semangka: 0,
                    serigala: 0,
                    serigalalastclaim: 0,
                    sewa: false,
                    shield: 0,
                    slayerglory: 0,
                    skill: "",
                    skillexp: 0,
                    skilladventure: 0,
                    skillgardening: 0,
                    skillfishing: 0,
                    skillsport: 0,
                    snlast: 0,
                    soda: 0,
                    sop: 0,
                    spammer: 0,
                    spinlast: 0,
                    ssapi: 0,
                    stamina: 200,
                    steak: 0,
                    stick: 0,
                    strength: 30,
                    string: 0,
                    stroberi: 0,
                    superior: 0,
                    suplabu: 0,
                    sushi: 0,
                    sword: 0,
                    sworddurability: 0,
                    tigame: 50,
                    tiketcoin: 0,
                    title: "",
                    tomat: 0,
                    tprem: 0,
                    trash: 0,
                    trofi: 0,
                    troopcamp: 0,
                    tumiskangkung: 0,
                    udang: 0,
                    udangbakar: 0,
                    umpan: 0,
                    uncommon: 0,
                    unreglast: 0,
                    upgrader: 0,
                    vodka: 0,
                    wallet: 0,
                    warn: 0,
                    weapon: 0,
                    weapondurability: 0,
                    wolf: 0,
                    wolfexp: 0,
                    wolflastfeed: 0,
                    wood: 0,
                    wortel: 0,
                    hargadiri: 0,
                    lastsex: 0,					
					c1: 0,
                    c2 :0,
                    c3 :0,
                    c4: 0,
                    c5: 0,
                    c6: 0,
                    c7: 0,
                    c8: 0,
                    c9: 0,
                    c10: 0,
                    hp: 0,
                    monitor :0,
                    mb :0,
                    internet: 0,
                    tipeyt: 0,
                    chname: "",
                    skillyt: 0,
                    mak: 0,
                    ssds: 0,
                    ram: 0,
                    gpu: 0,
                    cpu: 0,
                    se: 0,
                    kamera: 0,
                    pencahayaan: 0,
                    viewer :0,
                    like: 0,
                    dislike: 0,
                    subscriber: 0,
                    showtime: 0,
                    monet: 0,
                    video: 0,
                    lastup: 0,
                    lastlk: 0,
                    lastob: 0,
                    mie :0,
                    telur: 0,
                    bawangmerah: 0,
                    bawangputih: 0,
                    kecap: 0,
                    garam: 0,
                    saostiram: 0,
                    merica: 0,
                    air: 0,
                    mieayam: 0,
                    ruko: 0,
                    daunbawang: 0,
                    pajak: 0,
os: 0,
diperkosa: 0,
levelhunter: 0,
skill: "",
horizonglory: 0,
ravennaglory: 0,
apocalypseglory: 0,
sakanaglory: 0,
kazariteglory: 0,
chname: "",
skillsport: 0,
plastikpvc: 0,
semikonduktor: 0,
osr: 0,
minyak: 0,
susu: 0,
pisanggoreng: 0,
jusmangga: 0,
gulaiayam: 0,
invest: 0,
investProfit: 0,
investExpiration: 0,
timeShifterLevel: 0,
astralEssence: 100,
pity5Star: 0,
pity4Star: 0,
pity3Star: 0,
wishHistory: [],
husbu: [],
waifu: [],
loli: [],
milf: [],
furry: []
                }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== "object")
                global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat))
                    chat.isBanned = false
                if (!('antiwame' in chat))
                    chat.antiwame = true         
                if (!('antiLink' in chat))
                    chat.antiLink = true
                if (!('antiPorno' in chat))
                    chat.antiPorno = false
                if (!('antiLinkGc' in chat))           
                    chat.antiLinkGc = true
                if (!('antiLinkYt' in chat))
                    chat.antiLinkYt = false
                if (!('antiLinkTik' in chat))
                    chat.antiLinkTik = false
                if (!('antiLinkIg' in chat)) 
                    chat.antiLinkIg = false
                if (!('antiCall' in chat)) 
                    chat.antiCall = true
                if (!('antiBadword' in chat)) 
                    chat.antiBadword = true
                if (!('antiLinkHttp' in chat)) 
                    chat.antiLinkHttp = false
                if (!('antiSpam' in chat)) 
                    chat.antiSpam = true
                if (!('antiVirtex' in chat)) 
                    chat.antiVirtex = true
                if (!('antiBot' in chat)) 
                    chat.antiBot = false
                if (!('antiStiker' in chat)) 
                    chat.antiSticker = false
                if (!('virtex' in chat ))
                    chat.virtex = false 
                if (!('antiToxic' in chat)) 
                    chat.antiToxic = true
                if (!('bye' in chat))
                    chat.bye = false
                if (!('welcome' in chat))
                    chat.welcome = false
                if (!('antiApk' in chat))
                    chat.antiapk = false
                if (!('detect' in chat))
                    chat.detect = false
                if (!('sWelcome' in chat))
                    chat.sWelcome = ''
                if (!('sBye' in chat))
                    chat.sBye = ''
                if (!('sPromote' in chat))
                    chat.sPromote = ''
                if (!('sDemote' in chat))
                    chat.sDemote = ''
                if (!('delete' in chat))
                    chat.delete = false
                if (!('viewonce' in chat))
                    chat.viewonce = false
                if (!('simi' in chat))
                    chat.simi = false
                if (!('autoread' in chat)) 
                    chat.autoread = false
                if (!('nsfw' in chat))
                    chat.nsfw = false
                if (!('premnsfw' in chat))
                    chat.premnsfw = false
                if (!isNumber(chat.expired))
                    chat.expired = 0
            } else
                global.db.data.chats[m.chat] = {
                   isBanned: false,
                   antiwame: true,
                   antiLink: true,
                   antiLinkGc: true,
	                antiLinkTik: false,     	              
                    antiLinkTel: false,
	                antiLinkIg: false,
	                antiBadword: true,
	                antiLinkHttp: false,
	                antiLinkYt: false,
	                antiSpam: true,
                    antiPorno: false,
	                antiStiker: false,
	                antiVirtex: true,
	                antiApk: true,
	                antiBot: false,
                   virtex: false,
                   antiCall: true,
	                antiToxic: true,
	                bye: false,
                   welcome: false,
                   autoread: false,
                   detect: false,
                   sWelcome: '',
                   sBye: '',
                   sPromote: '',
                   sDemote: '',
                    delete: false,
                    viewonce: false,
                    simi: false,
                    expired: 0,
                    nsfw: false,
                    premnsfw: false,
                }
                let akinator = global.db.data.users[m.sender].akinator
			if (typeof akinator !== 'object')
				global.db.data.users[m.sender].akinator = {}
			if (akinator) {
				if (!('sesi' in akinator))
					akinator.sesi = false
				if (!('server' in akinator))
					akinator.server = null
				if (!('frontaddr' in akinator))
					akinator.frontaddr = null
				if (!('session' in akinator))
					akinator.session = null
				if (!('signature' in akinator))
					akinator.signature = null
				if (!('question' in akinator))
					akinator.question = null
				if (!('progression' in akinator))
					akinator.progression = null
				if (!('step' in akinator))
					akinator.step = null
				if (!('soal' in akinator))
					akinator.soal = null
			} else
				global.db.data.users[m.sender].akinator = {
					sesi: false,
					server: null,
					frontaddr: null,
					session: null,
					signature: null,
					question: null,
					progression: null,
					step: null, 
					soal: null
				}
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== "object") global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!("self" in settings)) settings.self = false
                if (!("autoread" in settings)) settings.autoread = false
                if (!("restrict" in settings)) settings.restrict = false
                if (!("anticall" in settings)) settings.anticall = true
                if (!("autorestart" in settings)) settings.autorestart = false
                if (!("restartDB" in settings)) settings.restartDB = 0
                if (!("status" in settings)) settings.status = 0
             
            } else global.db.data.settings[this.user.jid] = {
                self: false,
                autoread: false,
                anticall: true,
                restrict: false,
                autorestart: true,
                restartDB: 0,
                status: 0
            }
        } catch (e) {
            console.error(e)
        }
        if (opts['autoread']) await this.readMessages([m.key])
        if (opts['nyimak'])
            return
        if (!m.fromMe && opts['self'])
            return
        if (opts['pconly'] && m.chat.endsWith('g.us'))
            return
        if (opts['gconly'] && !m.chat.endsWith('g.us'))
            return
        if (opts['swonly'] && m.chat !== 'status@broadcast')
            return
        if (typeof m.text !== 'string')
            m.text = ''

        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || db.data.users[m.sender].premiumTime > 0

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

        if (m.isBaileys)
            return
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} 
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} 
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false 
        const isBotAdmin = bot?.admin || false 

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                   
                    console.error(e)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                            m.reply(`*🗂️ Plugin:* ${name}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${m.text}\n\n\${format(e)}`.trim(), data.jid)
                    }
                }
            }
            if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) {

                    continue
                }
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
            let match = (_prefix instanceof RegExp ? 
                [[_prefix.exec(m.text), _prefix]] :
                Array.isArray(_prefix) ? 
                    _prefix.map(p => {
                        let re = p instanceof RegExp ? 
                            p :
                            new RegExp(str2Regex(p))
                        return [re.exec(m.text), re]
                    }) :
                    typeof _prefix === 'string' ? 
                        [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                        [[[], new RegExp]]
            ).find(p => p[1])
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    func,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }))
                    continue
            }
            if (typeof plugin !== 'function')
                continue
            if ((usedPrefix = (match[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '')
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `
                
                command = (command || '').toLowerCase()
                let fail = plugin.fail || global.dfail 
                let isAccept = plugin.command instanceof RegExp ? 
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ? 
                        plugin.command.some(cmd => cmd instanceof RegExp ? 
                            cmd.test(command) :
                            cmd === command
                        ) :
                        typeof plugin.command === 'string' ? 
                            plugin.command === command :
                            false

                if (!isAccept)
                    continue
                m.plugin = name
                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    if (name != 'owner-unbanchat.js' && name != 'gc-kick.js' && name != 'xai.js' && name != 'tool-delete.js' && chat?.isBanned)
                        return 
                    if (name != 'owner-unbanuser.js' && user?.banned)
                        return
                }
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { 
                    fail('owner', m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) { 
                    fail('rowner', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) { 
                    fail('owner', m, this)
                    continue
                }
                if (plugin.mods && !isMods) { 
                    fail('mods', m, this)
                    continue
                }
                if (plugin.premium && !isPrems) {
                    fail('premium', m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) { 
                    fail('group', m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) { 
                    fail('botAdmin', m, this)
                    continue
                } else if (plugin.admin && !isAdmin) { 
                    fail('admin', m, this)
                    continue
                }
                if (plugin.private && m.isGroup) { 
                    fail('private', m, this)
                    continue
                }
                if (plugin.register == true && _user.registered == false) {
                    fail('unreg', m, this)
                    continue
                }
                m.isCommand = true
                let xp = "exp" in plugin ? parseInt(plugin.exp) : 17 
                if (xp > 200)
                    this.reply(m.chat, `[🚩] *Sepertinya Anda Curang Menggunakan Kalkulator*\nBuy Limit /buy limit\n\nCheat Limit /ngechit`, )
                else 
                m.exp += xp
                if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                    this.reply(m.chat, `[🚩] *Limit Anda kurang !!*\n 
*beli Limit Dengan Command*\n
*.beli Limit 2* `,)
                    continue 
                }
                if (plugin.level > _user.level) {
                    this.reply(m.chat, `[🚩] Diperlukan level ${plugin.level} untuk menggunakan perintah ini\n*Level mu:* ${_user.level} 📊*`,)
                    continue 
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    func,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems)
                        m.limit = m.limit || plugin.limit || false
                } catch (e) {
                   
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, "g"), "#HIDDEN#")
                        if (e.name)
                            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                                let data = (await conn.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    return m.reply(`*🗂️ Plugins:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${usedPrefix}${command} ${args.join(" ")}\n📄 *Error Logs:*\n\n${text}`.trim(), data.jid)
                            }
                        m.reply(text)
                    }
                } finally {
                  
                    if (typeof plugin.after === "function") {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    if (m.limit)
                        m.reply(+m.limit + " ʟɪᴍɪᴛ ᴛᴇʀᴘᴀᴋᴀɪ ✅✅")
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
     
        let user, stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
                user.limit -= m.limit * 1
            }

            let stat

            if (m.plugin) {

              let rn = ['r']

              let jd = rn[Math.floor(Math.random() * rn.length)]

              await this.sendPresenceUpdate(jd,m.chat)

                let now = +new Date

                if (m.plugin in stats) {

                    stat = stats[m.plugin]

                    if (!isNumber(stat.total)) stat.total = 1

                    if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1

                    if (!isNumber(stat.last)) stat.last = now

                    if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now

                } else stat = stats[m.plugin] = {

                    total: 1,

                    success: m.error != null ? 0 : 1,

                    last: now,

                    lastSuccess: m.error != null ? 0 : now

                }

                stat.total += 1

                

                if (m.isGroup) global.db.data.chats[m.chat].delay = now

                else global.db.data.users[m.sender].delay = now

                stat.last = now

                if (m.error == null) {

                    stat.success += 1

                    stat.lastSuccess = now

                }

            }

        }

        try {

            if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)

        } catch (e) {

            console.log(m, m.quoted, e)

        }

        if (opts['autoread']) await this.readMessages([m.key])
    }
}

export async function participantsUpdate({ id, participants, action }) {
    if (opts['self']) return;
    if (this.isInit) return;
    if (global.db.data == null) await loadDatabase();
    let chat = global.db.data.chats[id] || {};
    let text = '';

    switch (action) {
        case 'add':
        case 'remove':
            if (chat.welcome) {
                let groupMetadata = await this.groupMetadata(id) || (this.chats[id] || {}).metadata;
                for (let user of participants) {
                    let pp = 'https://telegra.ph/file/2d06f0936842064f6b3bb.png';
                    let ppgc = './src/avatar_contact.png';
                    try {
                        pp = await this.profilePictureUrl(user, 'image');
                        ppgc = await this.profilePictureUrl(id, 'image');
                    } catch (e) {
                        console.error(e);
                    } finally {
                        text = (action === 'add' ? 
                            (chat.sWelcome || this.welcome || 'Welcome, @user').replace('@xmember', groupMetadata.participants.length).replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknown') :
                            (chat.sBye || this.bye || 'Bye @user')
                        ).replace(/@user/g, '@' + user.split`@`[0]);

                        let wel = `https://tesapi-smoky.vercel.app/api/welcome?picurl=${pp}&name=${encodeURIComponent(await this.getName(user))}&bgurl=https://i.ibb.co/4YBNyvP/images-76.jpg&gcname=${encodeURIComponent(await this.getName(id))}&mem=${groupMetadata.participants.length}`;
                        let lea = `https://tesapi-smoky.vercel.app/api/welcome?picurl=${pp}&name=${encodeURIComponent(await this.getName(user))}&bgurl=https://i.ibb.co/4YBNyvP/images-76.jpg&gcname=${encodeURIComponent(await this.getName(id))}&mem=${groupMetadata.participants.length}`;

                        this.sendMessage(id, {
                            text: text,
                            contextInfo: {
                                mentionedJid: [user],
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: action === 'add' ? 'Selamat Datang' : 'Selamat tinggal',
                                    body: global.wm,
                                    thumbnailUrl: action === 'add' ? wel : lea,
                                    sourceUrl: global.sgc,
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }
                            }
                        }, { quoted: null });
                    }
                }
            }

            break
        case 'promote':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
        case 'demote':
            if (!text)
                text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
    }
}

/*export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = this.serializeM(this.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[msg.chat] || {}
        if (chat.delete)
            return
//conn.sendMessage(msg.chat, {
text: `🚩 Detected *@${participant.split`@`[0]}* Telah Menghapus Pesan.`,
contextInfo: {
externalAdReply: {
title: v,
thumbnailUrl: "https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg",
sourceUrl: sgc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: msg}) 
        //this.copyNForward(msg.chat, msg, false).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}*/
       
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        //await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}


export async function presenceUpdate(presenceUpdate) {
    const id = presenceUpdate.id;
    const nouser = Object.keys(presenceUpdate.presences);
    const status = presenceUpdate.presences[nouser]?.lastKnownPresence;
    const user = global.db.data.users[nouser[0]];

    if (user?.afk && status === "composing" && user.afk > -1) {
        if (user.banned) {
            user.afk = -1;
            user.afkReason = "User Banned Afk";
            return;
        }

        await console.log("AFK - TICK");
        const username = nouser[0].split("@")[0];
        const timeAfk = new Date() - user.afk;
        const caption = `\n@${username} berhenti afk, dia sedang mengetik\n\nAlasan: ${
      user.afkReason ? user.afkReason : "No Reason"
    }\nSelama ${timeAfk.toTimeString()} Yang Lalu\n`;

        this.reply(
            id,
            caption,
            null, {
                contextInfo: {
                    mentionedJid: [nouser[0]],
                    externalAdReply: {
                        title: "AFK Stopped",
                        thumbnail: await (await this.getFile("https://cdn-icons-png.flaticon.com/128/2576/2576762.png")).data
                    },
                },
            }
        )
        user.afk = -1;
        user.afkReason = "";
    }
}

global.dfail = (type, m, conn) => {

let msg = {
    rowner: `🚩 Sorry, *ᴏɴʟʏ ᴅᴇᴠᴇʟᴏᴘᴇʀ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ!`,
    owner: `🚩 Sorry, *ᴏɴʟʏ ᴏᴡɴᴇʀ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ!`,
    mods: `🚩 Sorry, ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴏᴅᴇʀᴀᴛᴏʀ ʙᴏᴛ!`,
    premium: `🚩 Only *ᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀ!`,
    group: `🚩 *ɢʀᴏᴜᴘ ᴄʜᴀᴛ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ!`,
    private: `🚩 *ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ!`,
    admin: `🚩 Sorry, *ᴏɴʟʏ ᴀᴅᴍɪɴ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ`,
    botAdmin: `🚩Soryy, *ᴏɴʟʏ ʙᴏᴛ ᴀᴅᴍɪɴ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴋᴇᴛɪᴋᴀ ʙᴏᴛ ᴍᴇɴᴊᴀᴅɪ ᴀᴅᴍɪɴ!`,
    nsfw: `🚩 Sorry, ᴍᴏʜᴏɴ ᴍᴀᴀғ, ғɪᴛᴜʀ ɴsғᴡ ᴛɪᴅᴀᴋ ᴀᴋᴛɪғ sᴀᴀᴛ ɪɴɪ. sɪʟᴀʜᴋᴀɴ ʜᴜʙᴜɴɢɪ ᴛᴇᴀᴍ ʙᴏᴛ ᴅɪsᴄᴜssɪᴏɴ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ!`,
    rpg: `🚩 Sorry, ᴍᴀᴀғ, ғɪᴛᴜʀ ʀᴘɢ ᴛɪᴅᴀᴋ ᴀᴋᴛɪғ sᴀᴀᴛ ɪɴɪ. sɪʟᴀʜᴋᴀɴ ʜᴜʙᴜɴɢɪ ᴛᴇᴀᴍ ʙᴏᴛ ᴅɪsᴄᴜssɪᴏɴ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴋᴛɪғᴋᴀɴ ғɪᴛᴜʀ ɪɴɪ!`,
    restrict: `🚩 Sorry, *ʀᴇsᴛʀɪᴄᴛ* • ʀᴇsᴛʀɪᴄᴛ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴅɪᴄʜᴀᴛ ɪɴɪ!`
}[type]
if (msg) return conn.sendMessage(m.chat, {
text: msg,
contextInfo: {
externalAdReply: {
title: v,
thumbnailUrl: "https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg",
sourceUrl: sgc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
let msgg = {
    unreg: `*「 🚩 DAFTAR 」*\n\n📝 Silahkan daftar ke database terlebih dahulu untuk menggunakan bot ini lebih lanjut. Gunakan perintah berikut:\n\n👉 .daftar namaAnda.umur\n👤 Contoh: .daftar BGS.20\n\n`
}[type]
if (msgg) return conn.sendMessage(m.chat, {
text: msgg,
contextInfo: {
externalAdReply: {
title: v,
thumbnailUrl: "https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg",
sourceUrl: sgc,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}    
    
function ucapan() {
const time = moment.tz('Asia/Jakarta').format('HH')
let res = "Sudah Dini Hari Kok Belum Tidur Kak?"
if (time >= 4) {
	res = "Pagi Lord 🌄"
}
if (time >= 10) {
	res = "Selamat Siang Kak ☀️"
}
if (time >= 15) {
	res = "Selamat Sore Kak 🌇"
}
if (time >= 18) {
	res = "Malam Kak 🌙"
}
return res
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
global.thumbdoc = 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg'
global.logo = 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg'
global.hyuri = ['https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg']
global.thumb = 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg' 
global.imagebot = 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg'
global.giflogo = 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg'
global.zykomd = 'https://telegra.ph/file/568a7bba190f80c9f5cc6.mp4'
global.thumbs = ['https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg']
global.hwaifu = ['https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg','https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg','https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg','https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg','https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg']
global.thumbnailUrl = [
  'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg', 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg',
  'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg', 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg',
  'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg', 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg',
  'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg', 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg',
  'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg', 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg', 'https://telegra.ph/file/0c4be183c36003a4e0bdb.jpg'
]
global.hLokun = ['https://telegra.ph/file/8902f4fc550727a62e99f.jpg','https://telegra.ph/file/6a6a40e924c16a8f0de03.jpg', 'https://telegra.ph/file/b035d3038a0b124f1d846.jpg', 'https://telegra.ph/file/9d475f7852bf6f6193c80.jpg']
global.hloli = ['https://telegra.ph/file/872c360a7104d86752650.jpg', 'https://telegra.ph/file/f6bbb53620374257bfa51.jpg','https://telegra.ph/file/9b76375f3869440818d57.jpg','https://telegra.ph/file/a78443f0ee887f46808d7.jpg']
global.hneko = ['https://telegra.ph/file/805a37b1e9a963e7d7ecf.jpg', 'https://telegra.ph/file/f9c4d97477b647cf57a2b.jpg','https://telegra.ph/file/b6905b77e6c7732592a13.jpg', 'https://telegra.ph/file/9f82c432d0ba4cfffda9a.png', 'https://telegra.ph/file/484083949d4bfd763b8cf.jpg']
global.hbunny = ['https://telegra.ph/file/2b71a8d46d29351479fbc.jpg', 'https://telegra.ph/file/ae610571b62b5ab876e9c.jpg', 'https://telegra.ph/file/cc8255d5b989eef587af2.jpg','https://telegra.ph/file/30d2e7375996abd9cfee3.jpg', 'https://telegra.ph/file/78980c90c44a95a1d30fa.jpg', 'https://telegra.ph/file/2ac5d8ccf23e73eaa5bfa.jpg']
global.hbeach = ['https://telegra.ph/file/14ae0ba2da77d74e6b80c.jpg', 'https://telegra.ph/file/b6905b77e6c7732592a13.jpg','https://telegra.ph/file/9da45a352eb4c40e5d641.jpg', 'https://telegra.ph/file/59e78846ee365975ee6e3.jpg','https://telegra.ph/file/1bf7dee46b83eb4c41d7d.jpg','https://telegra.ph/file/0525a7929f819cb8278f3.jpg']
global.fla = [
 "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
 "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
 "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
 "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
 "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="
]
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']
global.flaaa2 = [
 "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
 "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
 "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
 "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
 "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="
]
global.hoppai = ['https://telegra.ph/file/f34d76df4a2065af1a5ba.jpg','https://telegra.ph/file/05c1b22ee83bcd7723b4d.jpg','https://telegra.ph/file/1d886f66a44871205335f.jpg','https://telegra.ph/file/54d19a9094dc509370bf9.jpg','https://telegra.ph/file/e649475bcde78a9977ee5.jpg','https://telegra.ph/file/32ba20b6139b129c559c8.jpg','https://telegra.ph/file/948434cda49e4af5d9f11.jpg','https://telegra.ph/file/6f353c68533283fe79871.jpg','https://telegra.ph/file/de268ca9b01101acf2b8a.jpg','https://telegra.ph/file/fc6c5b2ae9a20c4256e7f.jpg', 'https://telegra.ph/file/efb70bb0988640f841742.jpg', 'https://telegra.ph/file/77d03fff530a2bcff3bf7.jpg','https://telegra.ph/file/6e4623464a659dd8d902b.jpg','https://telegra.ph/file/685aa39f0cb0f2c4fd85b.jpg','https://telegra.ph/file/10454b9ad693e1eefea58.jpg','https://telegra.ph/file/7de8ce5c290c3d8be0856.jpg','https://telegra.ph/file/8d7c4eadb7a4722747074.jpg','https://telegra.ph/file/ccc5f8eaac0f30919ef6c.jpg','https://telegra.ph/file/95f4b43439d7888f15ea5.jpg','https://telegra.ph/file/9c2a750db555bd2fad1f3.jpg', 'https://telegra.ph/file/efc5f7e637744fd6bfec2.jpg','https://telegra.ph/file/3a5231aade245665633bd.jpg','https://telegra.ph/file/2ecfc76feb26ec1eab99b.jpg','https://telegra.ph/file/dabb70983b4e833d98344.jpg','https://telegra.ph/file/75193a893e38fc580afe6.jpg','https://telegra.ph/file/217aa0f4ec76273808aa4.jpg','https://telegra.ph/file/8a35d3446b97ae22c7b23.jpg','https://telegra.ph/file/092df720701575a7ceaaa.jpg','https://telegra.ph/file/a65184a676cd648de34c3.jpg',
'https://telegra.ph/file/180e28807e78419d45537.jpg','https://telegra.ph/file/140eff27be983e0cd6781.jpg','https://telegra.ph/file/1581b791e16d0029e16b5.jpg','https://telegra.ph/file/6a4b36372b4f265bae3bc.jpg','https://telegra.ph/file/093caff422f194f00bc6c.jpg','https://telegra.ph/file/2294b7ab49eca8a8046b2.jpg','https://telegra.ph/file/869224d1c417e8b5c8ff1.jpg','https://telegra.ph/file/a78443f0ee887f46808d7.jpg','https://telegra.ph/file/1889878933264d16c58bf.jpg','https://telegra.ph/file/735aeb47d9c4aa87aaaf3.jpg','https://telegra.ph/file/fcf861516db09dda164e0.jpg','https://telegra.ph/file/355d96d7e06d109435f67.jpg']

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'handler.js'"))
if (global.reloadHandler) console.log(await global.reloadHandler())
})
