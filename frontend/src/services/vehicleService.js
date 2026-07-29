import api from './api';

export const vehicleService = {
    getVehicles: async () => {
        return await api.get('/vehicles');
    },

    searchVehicles: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.make?.trim()) params.append('make', filters.make.trim());
        if (filters.model?.trim()) params.append('model', filters.model.trim());
        if (filters.category?.trim()) params.append('category', filters.category.trim());
        if (filters.minPrice !== '' && filters.minPrice !== undefined && filters.minPrice !== null) {
            params.append('minPrice', filters.minPrice);
        }
        if (filters.maxPrice !== '' && filters.maxPrice !== undefined && filters.maxPrice !== null) {
            params.append('maxPrice', filters.maxPrice);
        }

        const queryString = params.toString();
        const url = queryString ? `/vehicles/search?${queryString}` : '/vehicles';
        return await api.get(url);
    },

    createVehicle: async (vehicleData) => {
        return await api.post('/vehicles', {
            make: vehicleData.make,
            model: vehicleData.model,
            category: vehicleData.category,
            price: Number(vehicleData.price),
            quantity: Number(vehicleData.quantity),
        });
    },

    updateVehicle: async (id, vehicleData) => {
        return await api.put(`/vehicles/${id}`, {
            make: vehicleData.make,
            model: vehicleData.model,
            category: vehicleData.category,
            price: Number(vehicleData.price),
            quantity: Number(vehicleData.quantity),
        });
    },

    deleteVehicle: async (id) => {
        return await api.delete(`/vehicles/${id}`);
    },

    purchaseVehicle: async (id) => {
        return await api.post(`/vehicles/${id}/purchase`);
    },

    restockVehicle: async (id, quantity) => {
        return await api.post(`/vehicles/${id}/restock`, {
            quantity: Number(quantity),
        });
    },
};

export default vehicleService;
