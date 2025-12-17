package com.lagrimas.lab_7.service;

import com.lagrimas.lab_7.model.Product;
import com.lagrimas.lab_7.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products from DB
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    // Get one product by ID
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    // Save/Create product to DB
    public Product create(Product product) {
        return productRepository.save(product);
    }

    // Update product in DB
    public Optional<Product> update(Long id, Product productDetails) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setName(productDetails.getName());
            existingProduct.setPrice(productDetails.getPrice());
            return productRepository.save(existingProduct);
        });
    }

    // Delete product from DB
    public boolean delete(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}