import BulmaModal from './bulma-modal';

export default { title: 'components / modal' };

export const base = () => {
	return ({
		template: `
            <bulma-modal class="is-active" v-bind="sampleModalContent" >
				<template #footer>
					<button class="button is-primary">Save changes</button>
					<button class="button">Cancel</button>
				</template>
			</bulma-modal>
        `,
		components: { BulmaModal },
		setup(){
			const sampleModalContent = {
				title: 'Modal title',
				description: 'Modal content',
			};
			return {
				sampleModalContent,
			};
		},
	});
};

export const extraButtons = () => {
	return ({
		template: `
            <bulma-modal class="is-active" v-bind="sampleModalContent">
                <template #extra-buttons>
                    <button class="button">Extra</button>
                </template>
            </bulma-modal>
        `,
		components: { BulmaModal },
		setup(){
			const sampleModalContent = {
				title: 'Modal title',
				description: 'Modal content',
				primaryButtonLabel: 'Save changes',
				secondaryButtonLabel: 'Cancel',
			};
			return {
				sampleModalContent,
			};
		},
	});
};

export const fancyFooter = () => {
	return ({
		template: `
            <bulma-modal class="is-active"
            v-bind="sampleModalContent"
            extraFooterClasses="has-background-warning is-justify-content-flex-end">
                <template #extra-buttons>
                    <button class="button">Extra</button>
                </template>
            </bulma-modal>
        `,
		components: { BulmaModal },
		setup(){
			const sampleModalContent = {
				title: 'Modal title',
				description: 'Modal content',
				primaryButtonLabel: 'Save changes',
				secondaryButtonLabel: 'Cancel',
			};
			return {
				sampleModalContent,
			};
		},
	});
};
