let Config = new Map;

Config['height'] = 12;
Config['width'] = 20;


let white = 'rgb(255, 255, 255)';

let delaysId = new Array('#red', '#orange', '#yellow', '#green', '#light_blue', '#blue', '#purple');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function UpdatePlayground()
{
	Config['height'] = Number($("#height").val());
	Config['width'] = Number($("#width").val());

	CreatePlayground();
}

async function Paint(pixel)
{
	console.log('hi');
	if ($('#erase').is(":checked")) return;

	$(pixel).addClass('color-animation');

	let delay = 0;
	let animation_duration = '';
	let animation_delay = '';

	delaysId.forEach(delayId => 
	{
		animation_duration += $(delayId).val() + 's, ';
		animation_delay += delay + 's, '
		delay += Number($(delayId).val());
	})

	animation_duration = animation_duration.slice(0, -2);
	animation_delay = animation_delay.slice(0, -2);

	$(pixel).css({'animation-duration': animation_duration});
	$(pixel).css({'animation-delay': animation_delay});

	$(pixel).css({"animation-play-state": "running"});

	await sleep(4.5 * 1000);
	if ($(pixel).css("animation-play-state") == "running")
	{
		$(pixel).removeClass('color-animation');
		$(pixel).css({"animation-play-state": "paused"});
		await sleep(500);
		Paint(pixel);
	}
}
function StopPaint(pixel)
{
	if ($(pixel).css('background-color') == white)
	{
		$(pixel).removeClass('color-animation');
	}
	
	$(pixel).css({"animation-play-state": "paused"});
}

function Erase(pixel)
{
	if ($('#erase').is(":checked"))
	{
		$(pixel).removeClass('color-animation');
	}
}

function CreatePlayground()
{
	$('#playground').empty();

	for (let i = 0; i < Config['height']; i++)
	{
		let line = $("<div></div>").addClass("line");
		for (let j = 0; j < Config['width']; j++)
		{
			let pixel = $("<div></div>").addClass("pixel-shell");
			let pixelInside = $("<div></div>").addClass("pixel-inside")
			.attr("onclick", "javascript:Erase(this)")
			.attr("onmouseenter", "javascript:Paint(this)")
			.attr("onmouseleave", "javascript:StopPaint(this)")
			pixel.append(pixelInside);

			line.append(pixel);
		}
		$("#playground").append(line);
	}
}

UpdatePlayground();