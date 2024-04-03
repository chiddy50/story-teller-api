import { PublicKey } from "@solana/web3.js";
import axios from "axios"

export const createUnderdogNft = async (data: any, projectId: string, pubKey: string) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
            },
        }

        const underdogApiEndpoint = process.env.NEXT_PUBLIC_UNDERDOG_API_URL

        // const nftData: { name: string, image: string, attributes: ChallengePayload } = {
        const nftData = {
            name: data.title,
            image: data.image,
            attributes: data,
            receiver: {
                address: pubKey,
                namespace: "superteam",
                identifier: data.email
            },
            // receiverAddress: pubKey, // publicKey(pubKey.toBase58()),
            receiverAddress: new PublicKey(pubKey).toBase58(),
            delegated: true,
            upsert: true
        };
        
        const createNftResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`, 
            nftData,
            config,
        ); 
        console.log(createNftResponse);
        
        
        return createNftResponse;
    } catch (error) {
        console.log(error);   
        return null; 
    }

}