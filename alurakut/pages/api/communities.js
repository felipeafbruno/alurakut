import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'cd11f429b9a6f0a556df487c160321';
        const client = new SiteClient(TOKEN);

        const createdRecord = await client.items.create({
            itemType: '972345', // ID do model de 'Community criado pelo DatoCMS
            ...request.body,
            // title: 'Moot Game Community',
            // imageUrl: 'data:image/png;base64,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',        
            // creatorSlug: 'felipeafbruno',
            // communityUrl: 'moot.us'
        });

        response.json({
            data: 'Algum dado qualquer',
            createdRecord: createdRecord,
        });

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada do GET, mas no POST tem!'
    });
}