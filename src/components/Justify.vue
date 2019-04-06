<template>

 	<v-layout v-if="$store.state.isUserLoggedIn">
		<v-flex>
			<panel title="Justifier votre texte">
				<form
					name="justify-form"
					autocomplete="off">
					<v-textarea
						label="Text"
						v-model="input"
					>
					</v-textarea>

					<div class="danger-error" v-if="error">
						{{ error }}
					</div>

					<v-btn
						class="blue-grey lighten-4
						"
						@click="addNewlines">
							Justify
					</v-btn>
				</form>

				<v-textarea
						label="Résultat"
						v-model="output"
						readonly
					>
				</v-textarea>
			</panel>
		</v-flex>
	</v-layout>
	
	<v-layout v-else>
		<access-denied/>
	</v-layout>

</template>

<script>
import JustifyService from '@/services/JustifyService'

export default {
	data() {
		return {
			input: '',
			output: '',
			error : null
		}
	},
	methods: {
		countLines(s) {
    		return s.split("\n").length - 1;
		},
		injectSpaces(t, spaces) {
			for (let i=0; i<t.length; i++) {
				if (spaces > 0) {
					t[i]  = " " + t[i];
					spaces--;	
				}
				else {
					break;
				}			
  			}
		},
		lenWithSpaces(t) {
    		let res = 0;
    		for (let i=0; i < t.length; i++) {
      			res += t[i].length + 1;
    		}
    		return res ;
		},
		arrayToLine(t) {
    		var res = t[0];
    		for (let i=1; i<t.length; i++) {
      			res += " " + t[i];
    		}
    		return res;
		},
		justifyy(input) {
    		var mots = []
    		var mots = input.split(" ");
    		var output ="";
    		var line = [];
    		line.push(mots[0]);
    		let spaces = 0;
    		for (let i=1; i< mots.length; i++) {
      			if (lenWithSpaces(line) + mots[i].length + 1 < 82) {
        			line.push(mots[i]);
      			}
      			else {
        			spaces = 80 - arrayToLine(line).length;
        			injectSpaces(line, spaces);
        			output += arrayToLine(line) + "\n";
        			line = [];
        			line.push(mots[i]);
      			}
    		}
    		output += arrayToLine(line);
    		return output
  		},
	 	async addNewlines() {
	 		try {
	 			var result = this.input
	 			var lol = await justifyy(result)
	 			console.log(lol)
    			//this.output = result
  			}
  			catch(error){
  				//this.error = "500 INTERNAL ERROR"
  				this.error = error.action.data.error
  			}
		}
	}
}
</script>

<style scoped>

</style>
