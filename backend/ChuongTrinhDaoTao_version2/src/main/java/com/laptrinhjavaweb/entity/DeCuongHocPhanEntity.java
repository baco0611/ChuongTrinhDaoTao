package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="DeCuongHocPhan")
@Data
public class DeCuongHocPhanEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="IdHocPhan")
	private HocPhanEntity HocPhanId;
	
	@Column
	private int PhienBan;
	
	@Column
	private int LyThuyet;
	
	@Column
	private int BaiTap;
	
	@Column
	private int ThaoLuan;
	
	@Column 
	private int ThucHanh;
	
	@Column
	private int ThucTap;
	
	@OneToMany(mappedBy = "idDeCuongHocPhan")
	private List<ChuongTrinhChiTietEntity> lstChuongTrinhChiTiet = new ArrayList<ChuongTrinhChiTietEntity>();
	
	
	
	
}
