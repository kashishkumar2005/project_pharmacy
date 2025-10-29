package com.pharmacy.service;

import com.pharmacy.dao.MedicineDAO;
import com.pharmacy.model.Medicine;

import java.sql.SQLException;
import java.util.List;

public class MedicineService {
    private MedicineDAO medicineDAO;
    
    public MedicineService() {
        this.medicineDAO = new MedicineDAO();
    }
    
    public List<Medicine> getAllMedicines() throws SQLException {
        return medicineDAO.getAllMedicines();
    }
    
    public Medicine getMedicineById(int id) throws SQLException {
        return medicineDAO.getMedicineById(id);
    }
    
    public boolean addMedicine(Medicine medicine) throws SQLException {
        validateMedicine(medicine);
        return medicineDAO.addMedicine(medicine);
    }
    
    public boolean updateMedicine(Medicine medicine) throws SQLException {
        validateMedicine(medicine);
        return medicineDAO.updateMedicine(medicine);
    }
    
    public boolean deleteMedicine(int id) throws SQLException {
        return medicineDAO.deleteMedicine(id);
    }
    
    public List<Medicine> getLowStockMedicines() throws SQLException {
        return medicineDAO.getLowStockMedicines();
    }
    
    public List<Medicine> searchMedicines(String keyword) throws SQLException {
        return medicineDAO.searchMedicines(keyword);
    }
    
    private void validateMedicine(Medicine medicine) {
        if (medicine.getName() == null || medicine.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Medicine name is required");
        }
        if (medicine.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        if (medicine.getPrice() == null || medicine.getPrice().signum() <= 0) {
            throw new IllegalArgumentException("Price must be positive");
        }
    }
}
