package com.pharmacy.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Medicine {
    private int id;
    private String name;
    private String category;
    private int quantity;
    private BigDecimal price;
    private int reorderLevel;
    private LocalDate expiryDate;
    private String supplier;
    
    public Medicine() {}
    
    public Medicine(int id, String name, String category, int quantity, 
                   BigDecimal price, int reorderLevel, LocalDate expiryDate, String supplier) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.reorderLevel = reorderLevel;
        this.expiryDate = expiryDate;
        this.supplier = supplier;
    }
    
    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public int getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(int reorderLevel) { this.reorderLevel = reorderLevel; }
    
    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    
    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }
}
