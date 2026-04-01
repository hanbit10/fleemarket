import { environment } from 'src/environments/environment';
export const BASE_URL = environment.production 
  ? 'https://everycent-backend.onrender.com' 
  : 'http://localhost:3000';
