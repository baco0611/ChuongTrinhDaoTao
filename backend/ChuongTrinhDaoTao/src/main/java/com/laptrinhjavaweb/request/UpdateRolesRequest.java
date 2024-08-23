package com.laptrinhjavaweb.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRolesRequest {
    private Long lecturerId; 
    private List<String> role; 
}
