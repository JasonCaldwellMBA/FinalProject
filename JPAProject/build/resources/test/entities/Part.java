package entities;
//test
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Part {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private double cost;
	@Column(name="serial_number")
	private String serialNumber;
	private String name;
	@ManyToOne
	@JoinColumn(name="parts_request_id")
	private PartRequest partsRequest;
	@ManyToOne
	@JoinColumn(name="parts_quote_id")
	private PartQuote partsQuote;

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PartRequest getPartsRequest() {
		return partsRequest;
	}

	public void setPartsRequest(PartRequest partsRequest) {
		this.partsRequest = partsRequest;
	}

	public PartQuote getPartsQuote() {
		return partsQuote;
	}

	public void setPartsQuote(PartQuote partsQuote) {
		this.partsQuote = partsQuote;
	}

	public int getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Part [id=" + id + ", cost=" + cost + ", serialNumber=" + serialNumber + ", name=" + name
				+ ", partsRequest=" + partsRequest + ", partsQuote=" + partsQuote + "]";
	}
}
	
