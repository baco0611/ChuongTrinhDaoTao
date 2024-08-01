package com.laptrinhjavaweb.converter;

import java.util.Collections;

import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.request.LecturersResponse;

public class LecturersConverter {

    public static LecturersResponse convertToResponse(LecturersEntity entity) {
        if (entity == null) {
            return null;
        }

        LecturersResponse response = new LecturersResponse();
        response.setFirstName(entity.getFirstName());
        response.setLastName(entity.getLastName());
        response.setDepartmentName(entity.getDepartment() != null ? entity.getDepartment().getDepartmentName() : null);
        response.setEmail(entity.getEmail());
        response.setLecturersCode(entity.getLecturersCode());
        response.setRole(Collections.singletonList(entity.getRole().name())); // Single enum value to list

        return response;
    }
}
