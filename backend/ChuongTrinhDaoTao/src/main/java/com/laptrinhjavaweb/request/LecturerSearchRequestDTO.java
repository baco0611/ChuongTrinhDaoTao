package com.laptrinhjavaweb.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LecturerSearchRequestDTO {
	private String keyWord;
    private String department;
}
