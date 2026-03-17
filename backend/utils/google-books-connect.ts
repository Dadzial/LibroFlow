import {config} from '../config';

export const GoogleBooksAPI = {

     search: async (query: string) => {
        const res = await fetch(
            `${config.googleBooksUrl}/volumes?q=${encodeURIComponent(query)}&key=${config.googlApiKey}&maxResults=20`
        )
        const data = await res.json()

        return data.items?.map((item: any) => ({
            googleId: item.id,
            title:    item.volumeInfo.title,
            author:   item.volumeInfo.authors?.[0] ?? 'Author unknown',
            cover:    item.volumeInfo.imageLinks?.thumbnail ?? null,
            description: item.volumeInfo.description ?? null,
            isbn:     item.volumeInfo.industryIdentifiers?.[0]?.identifier ?? null
        })) ?? []
    },

}