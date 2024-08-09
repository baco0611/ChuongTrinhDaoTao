package com.laptrinhjavaweb.converter;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.laptrinhjavaweb.dataEnum.Role;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RolesConverter implements AttributeConverter<List<Role>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Role> roles) {
        try {
            return objectMapper.writeValueAsString(roles);
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert roles to JSON", e);
        }
    }

    @Override
    public List<Role> convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        try {
            return objectMapper.readValue(dbData, new TypeReference<List<Role>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert JSON to roles", e);
        }
    }
}