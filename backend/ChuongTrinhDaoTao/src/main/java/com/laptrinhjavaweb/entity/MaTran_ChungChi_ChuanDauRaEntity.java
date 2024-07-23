package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="MaTranChungChiChuanDauRa")
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
