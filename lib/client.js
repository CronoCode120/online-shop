import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'zktrrjf8',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-04-16',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}