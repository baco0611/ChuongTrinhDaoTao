package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.DepartmentDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DepartmentResponse {
	private List<DepartmentDTO> data;
	private int status;
}
