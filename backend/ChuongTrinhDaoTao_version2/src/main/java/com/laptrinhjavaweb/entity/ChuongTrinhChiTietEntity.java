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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="chuongTrinhChiTiet")
@Data
public class ChuongTrinhChiTietEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idChuongTrinhChiTiet;
	
	@Column
	private Boolean batBuoc;
	
	@Column 
	private Boolean thayTheKhoaLuan;
	
	@Column(length = 50)
	private String tienQuyet;
	
	@Column(length = 50)
	private String hocTruoc;
	
	@Column(length = 50)
	private String songHanh;
	
	@Column
	private int hocKy;
	
	@Column
	private String khoiKienThuc;
	
	@Column 
	private String chiTietKhoiKienThuc;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="Id")
	private DeCuongHocPhanEntity idDeCuongHocPhan;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuyenNganh")
	private ChuyenNganhDaoTaoEntity idChuyenNganh;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "chuongTrinhChiTiet_chungChiDieuKien", joinColumns = @JoinColumn(name = "idChuongTrinhChiTiet"), 
								  inverseJoinColumns = @JoinColumn(name = "idChungChi"))
	private List<DanhMucChungChiDieuKienEntity> lstChungChi = new ArrayList<DanhMucChungChiDieuKienEntity>();
	
	@OneToMany(mappedBy = "idChuongTrinhChiTiet")
	private List<MaTran_HocPhan_ChuanDauRaEntity> lstHocPhanChuanDauRa = new ArrayList<MaTran_HocPhan_ChuanDauRaEntity>();
}
