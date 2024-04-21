package com.laptrinhjavaweb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="maTranChungChiChuanDauRa")
@Data
public class MaTran_ChungChi_ChuanDauRaEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMaTran;

	@Column
	private int trinhDoNangLuc;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChungChi")
	private DanhMucChungChiDieuKienEntity idChungChi;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuanDauRa")
	private ChuanDauRaEntity idChuanDauRa;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
}
