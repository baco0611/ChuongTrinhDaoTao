package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.SpecializationDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecializationResponse {
	private List<SpecializationDTO> data;
    private int status;
}
