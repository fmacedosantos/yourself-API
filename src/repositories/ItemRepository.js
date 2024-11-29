const admin = require('firebase-admin');
const { COLECAO } = require('../constants/Collections.js');

class ItemRepository {

    db = admin.firestore();

    async cadastrarItem(nome, preco, icone) {

        const itemRef = this.db.collection(COLECAO.ITEM).doc();
        const id = itemRef.id;

        const item = {
            id,
            nome,
            preco, 
            icone
        };

        await this.db.collection(COLECAO.ITEM).doc(id).set(item);
        
    }

    async comprarItem(id, email) {

        const itemRef = this.db.collection(COLECAO.ITEM).doc(id);
        const itemDoc = await itemRef.get();

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioDoc = await usuarioRef.get();

        const pontosUsuario = usuarioDoc.get("pontos");
        const precoItem = itemDoc.get("preco");

        const usuarioData = usuarioDoc.data();
        const novosPontos = usuarioData.pontos - precoItem;

        await usuarioRef.update({
            itens: admin.firestore.FieldValue.arrayUnion(id),
            pontos: novosPontos
        });
        
    }

    async mostrarItens(email) {

        const usuarioRef = this.db.collection(COLECAO.USUARIO).doc(email);
        const usuarioSnapshot = await usuarioRef.get();

        const usuarioData = usuarioSnapshot.data();

        const idItens = usuarioData.itens || [];
        const itens = [];

        for(const id of idItens){
            const itemSnapshot = await this.db.collection(COLECAO.ITEM).doc(id).get();
            if (itemSnapshot.exists) {
                itens.push(itemSnapshot.data());
            }
        }

        return itens;
        
    }

    async mostrarTodosItens() {

        const itens = [];
        const itemSnapshot = await this.db.collection(COLECAO.ITEM).get();
    
        itemSnapshot.forEach((doc) => {
            itens.push(doc.data());
        });
    
        return itens;
        
    }
    
    async atualizarItem(id, nome = null, preco = null, icone = null) {
        const itemSnapshot = await this.db.collection(COLECAO.ITEM).doc(id).get();

        const itemData = itemSnapshot.data();

        const atualizacoes = {
            nome: nome !== null ? nome : itemData.nome,
            preco: preco !== null ? preco : itemData.preco,
            icone: icone !== null ? icone : itemData.icone
        }

        if (Object.keys(atualizacoes).length > 0) {
            await this.db.collection(COLECAO.ITEM).doc(id).update(atualizacoes);
        }
        
    }

    async deletarItem(id) {

        const itemRef = this.db.collection(COLECAO.ITEM).doc(id);

        await itemRef.delete();

        const usuariosQuery = await this.db.collection(COLECAO.USUARIO)
            .where("itens", "array-contains", id).get();

        if (!usuariosQuery.empty) {
            usuariosQuery.forEach(async (usuarioDoc) => {
                await usuarioDoc.ref.update({
                    itens: admin.firestore.FieldValue.arrayRemove(id)
                });
            });
        }
    }
}

module.exports = ItemRepository;