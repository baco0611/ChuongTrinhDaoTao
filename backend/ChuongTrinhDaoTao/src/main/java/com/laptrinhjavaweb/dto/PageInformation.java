package com.laptrinhjavaweb.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageInformation {
	private int numOfElement;
	private int pageSize;
	private long offset;
	private boolean firstPage;
	private boolean lastPage;
	private int pageOrder;
	private int totalPages;
	private long totalElements;
}