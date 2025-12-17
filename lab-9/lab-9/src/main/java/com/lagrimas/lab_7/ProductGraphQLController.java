package com.lagrimas.lab_7;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductGraphQLController {

    private final ProductService productService;

    public ProductGraphQLController(ProductService productService) {
        this.productService = productService;
    }

    @QueryMapping
    public List<Product> allProducts() {
        return productService.getAll();
    }

    @QueryMapping
    public Product productById(@Argument Long id) {
        return productService.getById(id).orElse(null);
    }

    @MutationMapping
    public Product createProduct(@Argument String name, @Argument Double price) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        return productService.save(p);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument String name, @Argument Double price) {
        return productService.getById(id).map(existing -> {
            existing.setName(name);
            existing.setPrice(price);
            return productService.save(existing);
        }).orElse(null);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        productService.delete(id);
        return true;
    }
}
