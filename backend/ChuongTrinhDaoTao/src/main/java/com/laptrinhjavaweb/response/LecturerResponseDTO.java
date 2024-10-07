package com.laptrinhjavaweb.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LecturerResponseDTO {
	private String lecturerCode;
    private String lecturerName;
    private String department;
}
