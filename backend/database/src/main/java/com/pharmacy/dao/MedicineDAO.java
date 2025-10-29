package com.pharmacy.dao;

import com.pharmacy.config.DatabaseConnection;
import com.pharmacy.model.Medicine;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MedicineDAO {
    
    public List<Medicine> getAllMedicines() throws SQLException {
        List<Medicine> medicines = new ArrayList<>();
        String query = "SELECT * FROM medicines ORDER BY name";
        
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            while (rs.next()) {
                medicines.add(extractMedicineFromResultSet(rs));
            }
        }
        return medicines;
    }
    
    public Medicine getMedicineById(int id) throws SQLException {
        String query = "SELECT * FROM medicines WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return extractMedicineFromResultSet(rs);
            }
        }
        return null;
    }
    
    public boolean addMedicine(Medicine medicine) throws SQLException {
        String query = "INSERT INTO medicines (name, category, quantity, price, " +
                      "reorder_level, expiry_date, supplier) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            
            setMedicineParameters(pstmt, medicine);
            int rowsAffected = pstmt.executeUpdate();
            
            if (rowsAffected > 0) {
                ResultSet rs = pstmt.getGeneratedKeys();
                if (rs.next()) {
                    medicine.setId(rs.getInt(1));
                }
                return true;
            }
        }
        return false;
    }
    
    public boolean updateMedicine(Medicine medicine) throws SQLException {
        String query = "UPDATE medicines SET name = ?, category = ?, quantity = ?, " +
                      "price = ?, reorder_level = ?, expiry_date = ?, supplier = ? WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            setMedicineParameters(pstmt, medicine);
            pstmt.setInt(8, medicine.getId());
            
            return pstmt.executeUpdate() > 0;
        }
    }
    
    public boolean deleteMedicine(int id) throws SQLException {
        String query = "DELETE FROM medicines WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        }
    }
    
    public List<Medicine> getLowStockMedicines() throws SQLException {
        List<Medicine> medicines = new ArrayList<>();
        String query = "SELECT * FROM medicines WHERE quantity < reorder_level";
        
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            
            while (rs.next()) {
                medicines.add(extractMedicineFromResultSet(rs));
            }
        }
        return medicines;
    }
    
    public List<Medicine> searchMedicines(String keyword) throws SQLException {
        List<Medicine> medicines = new ArrayList<>();
        String query = "SELECT * FROM medicines WHERE name LIKE ? OR category LIKE ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(query)) {
            
            String searchPattern = "%" + keyword + "%";
            pstmt.setString(1, searchPattern);
            pstmt.setString(2, searchPattern);
            
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                medicines.add(extractMedicineFromResultSet(rs));
            }
        }
        return medicines;
    }
    
    private Medicine extractMedicineFromResultSet(ResultSet rs) throws SQLException {
        Medicine medicine = new Medicine();
        medicine.setId(rs.getInt("id"));
        medicine.setName(rs.getString("name"));
        medicine.setCategory(rs.getString("category"));
        medicine.setQuantity(rs.getInt("quantity"));
        medicine.setPrice(rs.getBigDecimal("price"));
        medicine.setReorderLevel(rs.getInt("reorder_level"));
        medicine.setExpiryDate(rs.getDate("expiry_date").toLocalDate());
        medicine.setSupplier(rs.getString("supplier"));
        return medicine;
    }
    
    private void setMedicineParameters(PreparedStatement pstmt, Medicine medicine) throws SQLException {
        pstmt.setString(1, medicine.getName());
        pstmt.setString(2, medicine.getCategory());
        pstmt.setInt(3, medicine.getQuantity());
        pstmt.setBigDecimal(4, medicine.getPrice());
        pstmt.setInt(5, medicine.getReorderLevel());
        pstmt.setDate(6, Date.valueOf(medicine.getExpiryDate()));
        pstmt.setString(7, medicine.getSupplier());
    }
}
