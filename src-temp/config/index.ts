import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    RPC_PROVIDER: process.env.RPC_PROVIDER || '',
    RELAY_ADDRESS: process.env.RELAY_ADDRESS || '',
}
