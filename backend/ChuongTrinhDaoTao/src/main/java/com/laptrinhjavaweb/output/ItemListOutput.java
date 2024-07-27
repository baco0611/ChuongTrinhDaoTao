package com.laptrinhjavaweb.output;

import lombok.Data;

@Data
public class ItemListOutput {
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
