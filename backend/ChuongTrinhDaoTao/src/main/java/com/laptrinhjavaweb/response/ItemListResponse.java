package com.laptrinhjavaweb.response;

import lombok.Data;

@Data
public class ItemListResponse {
    private String programCode;
    
    private String vietnameseName;
    
    private String fieldName;
    
    private Integer status;
    
    private Integer sequence;
    
    private Long programId;
    
    private String responsiblePerson;
    
    private String createdAt;
    
    private String updatedAt;
}
