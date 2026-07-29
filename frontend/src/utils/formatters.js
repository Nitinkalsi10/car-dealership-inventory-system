// Format numbers as USD currency
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Return badge metadata based on stock quantity
export const getStockStatus = (quantity) => {
  const q = Number(quantity) || 0;
  if (q <= 0) {
    return {
      label: 'Out of Stock',
      variant: 'danger',
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      dotColor: 'bg-red-500',
    };
  }
  if (q <= 5) {
    return {
      label: 'Low Stock',
      variant: 'warning',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-500',
    };
  }
  return {
    label: 'In Stock',
    variant: 'success',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500',
  };
};

// Fallback high quality realistic car images per category/make
const CAR_IMAGES = {
  Sedan: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
  ],
  SUV: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
  ],
  Truck: [
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
  ],
  Coupe: [
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
  ],
  Luxury: [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
  ],
  Electric: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
  ],
};

export const getVehicleImage = (vehicle) => {
  if (vehicle?.image) return vehicle.image;
  const category = vehicle?.category || 'Sedan';
  const list = CAR_IMAGES[category] || CAR_IMAGES['Sedan'];
  // Return deterministic image based on vehicle id or make string hash
  const hashStr = (vehicle?._id || vehicle?.model || 'car').toString();
  let hash = 0;
  for (let i = 0; i < hashStr.length; i++) {
    hash = (hash << 5) - hash + hashStr.charCodeAt(i);
  }
  const index = Math.abs(hash) % list.length;
  return list[index];
};
