package com.pharmacy;

import com.pharmacy.model.Medicine;
import com.pharmacy.service.MedicineService;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

public class PharmacyApplication {
    private static MedicineService medicineService = new MedicineService();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("   PHARMACY INVENTORY MANAGEMENT SYSTEM");
        System.out.println("=================================================\n");
        
        while (true) {
            displayMenu();
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline
            
            try {
                switch (choice) {
                    case 1:
                        listAllMedicines();
                        break;
                    case 2:
                        addNewMedicine();
                        break;
                    case 3:
                        updateMedicine();
                        break;
                    case 4:
                        deleteMedicine();
                        break;
                    case 5:
                        viewLowStockMedicines();
                        break;
                    case 6:
                        searchMedicines();
                        break;
                    case 0:
                        System.out.println("\nThank you for using Pharmacy System!");
                        System.out.println("Goodbye!");
                        return;
                    default:
                        System.out.println("❌ Invalid choice! Please try again.");
                }
            } catch (SQLException e) {
                System.out.println("❌ Database error: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("❌ Error: " + e.getMessage());
            }
            
            System.out.println("\nPress Enter to continue...");
            scanner.nextLine();
        }
    }
    
    private static void displayMenu() {
        System.out.println("\n=== MAIN MENU ===");
        System.out.println("1. List All Medicines");
        System.out.println("2. Add New Medicine");
        System.out.println("3. Update Medicine");
        System.out.println("4. Delete Medicine");
        System.out.println("5. View Low Stock Medicines");
        System.out.println("6. Search Medicines");
        System.out.println("0. Exit");
        System.out.print("\nEnter your choice: ");
    }
    
    private static void listAllMedicines() throws SQLException {
        List<Medicine> medicines = medicineService.getAllMedicines();
        System.out.println("\n=== ALL MEDICINES ===");
        System.out.println("-".repeat(100));
        System.out.printf("%-5s %-25s %-20s %-10s %-10s %-15s%n", 
                         "ID", "Name", "Category", "Quantity", "Price", "Expiry Date");
        System.out.println("-".repeat(100));
        
        for (Medicine med : medicines) {
            System.out.printf("%-5d %-25s %-20s %-10d ₹%-9.2f %-15s%n",
                            med.getId(), 
                            med.getName(), 
                            med.getCategory(),
                            med.getQuantity(), 
                            med.getPrice(), 
                            med.getExpiryDate());
        }
        System.out.println("-".repeat(100));
        System.out.println("Total Medicines: " + medicines.size());
    }
    
    private static void addNewMedicine() throws SQLException {
        System.out.println("\n=== ADD NEW MEDICINE ===");
        
        System.out.print("Enter medicine name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter category: ");
        String category = scanner.nextLine();
        
        System.out.print("Enter quantity: ");
        int quantity = scanner.nextInt();
        
        System.out.print("Enter price: ");
        BigDecimal price = scanner.nextBigDecimal();
        
        System.out.print("Enter reorder level: ");
        int reorderLevel = scanner.nextInt();
        scanner.nextLine();
        
        System.out.print("Enter expiry date (YYYY-MM-DD): ");
        LocalDate expiryDate = LocalDate.parse(scanner.nextLine());
        
        System.out.print("Enter supplier: ");
        String supplier = scanner.nextLine();
        
        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setCategory(category);
        medicine.setQuantity(quantity);
        medicine.setPrice(price);
        medicine.setReorderLevel(reorderLevel);
        medicine.setExpiryDate(expiryDate);
        medicine.setSupplier(supplier);
        
        if (medicineService.addMedicine(medicine)) {
            System.out.println("✅ Medicine added successfully! ID: " + medicine.getId());
        } else {
            System.out.println("❌ Failed to add medicine.");
        }
    }
    
    private static void updateMedicine() throws SQLException {
        System.out.print("\nEnter medicine ID to update: ");
        int id = scanner.nextInt();
        scanner.nextLine();
        
        Medicine medicine = medicineService.getMedicineById(id);
        if (medicine == null) {
            System.out.println("❌ Medicine not found!");
            return;
        }
        
        System.out.println("\n��� Current details: " + medicine.getName());
        System.out.print("Enter new quantity (current: " + medicine.getQuantity() + "): ");
        int quantity = scanner.nextInt();
        
        System.out.print("Enter new price (current: " + medicine.getPrice() + "): ");
        BigDecimal price = scanner.nextBigDecimal();
        
        medicine.setQuantity(quantity);
        medicine.setPrice(price);
        
        if (medicineService.updateMedicine(medicine)) {
            System.out.println("✅ Medicine updated successfully!");
        } else {
            System.out.println("❌ Failed to update medicine.");
        }
    }
    
    private static void deleteMedicine() throws SQLException {
        System.out.print("\nEnter medicine ID to delete: ");
        int id = scanner.nextInt();
        
        System.out.print("⚠️  Are you sure you want to delete this medicine? (yes/no): ");
        scanner.nextLine();
        String confirm = scanner.nextLine();
        
        if (confirm.equalsIgnoreCase("yes")) {
            if (medicineService.deleteMedicine(id)) {
                System.out.println("✅ Medicine deleted successfully!");
            } else {
                System.out.println("❌ Failed to delete medicine.");
            }
        } else {
            System.out.println("❌ Deletion cancelled.");
        }
    }
    
    private static void viewLowStockMedicines() throws SQLException {
        List<Medicine> medicines = medicineService.getLowStockMedicines();
        System.out.println("\n=== ⚠️  LOW STOCK MEDICINES ===");
        
        if (medicines.isEmpty()) {
            System.out.println("✅ No low stock medicines found.");
            return;
        }
        
        System.out.println("-".repeat(80));
        for (Medicine med : medicines) {
            System.out.printf("��� %s - Stock: %d (Min: %d) - Deficit: %d%n",
                            med.getName(), 
                            med.getQuantity(), 
                            med.getReorderLevel(),
                            med.getReorderLevel() - med.getQuantity());
        }
        System.out.println("-".repeat(80));
        System.out.println("Total Low Stock Items: " + medicines.size());
    }
    
    private static void searchMedicines() throws SQLException {
        System.out.print("\nEnter search keyword: ");
        String keyword = scanner.nextLine();
        
        List<Medicine> medicines = medicineService.searchMedicines(keyword);
        System.out.println("\n=== SEARCH RESULTS ===");
        
        if (medicines.isEmpty()) {
            System.out.println("❌ No medicines found matching '" + keyword + "'");
            return;
        }
        
        System.out.println("-".repeat(80));
        for (Medicine med : medicines) {
            System.out.printf("%d. %s (%s) - Qty: %d, Price: ₹%.2f%n",
                            med.getId(), 
                            med.getName(), 
                            med.getCategory(),
                            med.getQuantity(), 
                            med.getPrice());
        }
        System.out.println("-".repeat(80));
        System.out.println("Found " + medicines.size() + " medicine(s)");
    }
}
