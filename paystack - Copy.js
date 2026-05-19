const axios = require('axios');

class PaystackService {
    constructor() {
        this.baseURL = process.env.PAYSTACK_BASE_URL;
        this.secretKey = process.env.PAYSTACK_SECRET_KEY;
        this.publicKey = process.env.PAYSTACK_PUBLIC_KEY;
        
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${this.secretKey}`,
                'Content-Type': 'application/json'
            }
        });
    }

    // Initialize transaction
    async initializeTransaction(email, amount, reference, metadata = {}) {
        try {
            const response = await this.axiosInstance.post('/transaction/initialize', {
                email,
                amount: amount * 100, // Convert to kobo
                reference,
                currency: 'GHS',
                metadata
            });
            
            return response.data;
        } catch (error) {
            console.error('Paystack initialization error:', error.response?.data || error.message);
            throw new Error('Failed to initialize payment');
        }
    }

    // Verify transaction
    async verifyTransaction(reference) {
        try {
            const response = await this.axiosInstance.get(`/transaction/verify/${reference}`);
            return response.data;
        } catch (error) {
            console.error('Paystack verification error:', error.response?.data || error.message);
            throw new Error('Failed to verify payment');
        }
    }

    // Create transfer recipient (for future use)
    async createTransferRecipient(name, accountNumber, bankCode) {
        try {
            const response = await this.axiosInstance.post('/transferrecipient', {
                type: 'nuban',
                name,
                account_number: accountNumber,
                bank_code: bankCode,
                currency: 'GHS'
            });
            
            return response.data;
        } catch (error) {
            console.error('Paystack recipient creation error:', error.response?.data || error.message);
            throw new Error('Failed to create transfer recipient');
        }
    }
}

module.exports = new PaystackService();