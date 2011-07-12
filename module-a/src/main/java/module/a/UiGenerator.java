package module.a;

import sun.misc.BASE64Encoder;


public class UiGenerator {

	public String produceResponse(byte[] image){
		StringBuffer buffer = new StringBuffer();
		buffer.append("<response><count>");
		BASE64Encoder encoder = new BASE64Encoder();
		buffer.append("<hr><img src=\"data:image/png;base64," + encoder.encode(image) + "\" alt=\"Red dot\" />");
		buffer.append("</count></response>");
		return buffer.toString();
	}
}
