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
}
