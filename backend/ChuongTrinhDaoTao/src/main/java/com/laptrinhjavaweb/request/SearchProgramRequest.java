package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class SearchProgramRequest {
    private String keyword;
    private String department;
    private int pageSize;
    private int pageOrder;
}
