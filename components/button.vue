<template lang="pug">
button.customBtn(
	:class="{'customBtn__tariffs' : type === 'tariffs' }"
	v-on="$listeners"
)
	slot
</template>

<script>
export default {
	name: 'Button',
	props:['type']
}
</script>

<style lang="scss" scoped>
.customBtn {
	border: 0;
	background: linear-gradient(96.33deg, #20C6EB 5.54%, #00DDAB 96.19%);
	border-radius: desktop-vw(24);
	height: desktop-vw(50);
	padding: 0 desktop-vw(28);
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	font-weight: 400;
	font-size: desktop-vw(16);
	line-height: 158%;
	text-transform: uppercase;
	color: #000000;
	width: max-content;
	transition: background .5s ease;
	background-size: 100%;  

	&__tariffs {
		height:  desktop-vw(41);
		padding: 0 desktop-vw(20);
	}

	&:hover {
		background-position: desktop-vw(-440);
		background-size: 300%;
	}
}

.customBtn__tariffs {
	&:hover {
		background-position: desktop-vw(-200);
		background-size: 250%;
	}
}
@media screen and (max-width: $tablet) {
	.customBtn {
		border-radius: tablet-vw(24);
		min-height: tablet-vw(50);
		padding: 0 tablet-vw(28);
		font-size: tablet-vw(16);

		&__tariffs {
			min-height:  tablet-vw(41);
			padding: 0 tablet-vw(20);
		}
	}
}

@media screen and (max-width: $mobile) {
	.customBtn {
		border-radius: mobile-vw(24);
		min-height: mobile-vw(50);
		padding: 0 mobile-vw(28);
		font-size: mobile-vw(16);

		&__tariffs {
			min-height:  mobile-vw(41);
			padding: 0 mobile-vw(20);
		}
	}
}

</style>