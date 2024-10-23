package com.laptrinhjavaweb.request;

import java.util.List;

import com.laptrinhjavaweb.dto.CreateElementDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateMatrixRequestDTO {
	private List<Long> deleteElement;  
    private List<CreateElementDTO> createElement;
    private Long programId;
}
