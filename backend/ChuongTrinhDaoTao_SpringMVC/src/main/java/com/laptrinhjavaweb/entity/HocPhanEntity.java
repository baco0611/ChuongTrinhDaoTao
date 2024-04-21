package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Table(name="HocPhan")
@Data
//Bảng này phải đặt tên có kiểu khác để match dữ liệu có sẵn
public class HocPhanEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long IdHocPhan;
	
	@Column 
	private String TenHocPhan;
	
	@Column
	private String TenTiengAnh;
	
	@Column(length = 50)
	private String MaHocPhan;
	
	@Column
	private int SoTinChi;
	
	@Column(length = 50)
	private String DonViPhuTrach;
	
	@Column(length = 50)
	private String TrangThaiHocPhan;
	
	@Column(length = 50)
	private String CreatedBy;
	
	@CreationTimestamp
	private Date CreatedTime;
	
	@Column
	private String ModifiedBy;
	
	@CreationTimestamp
	private Date ModifiedTime;
	
	@OneToMany(mappedBy = "HocPhanId")
	private List<DeCuongHocPhanEntity> lstDecuongHocPhan = new ArrayList<DeCuongHocPhanEntity>();
}
