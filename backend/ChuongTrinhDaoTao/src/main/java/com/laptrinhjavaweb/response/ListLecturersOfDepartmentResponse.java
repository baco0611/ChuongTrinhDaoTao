package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.dto.DepartmentDetailDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListLecturersOfDepartmentResponse {
	private List<DepartmentDetailDTO> data;
    private int status;
}
