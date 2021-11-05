import NotificationReviewed from './notification-reviewed';
import NotificationEnhancedReviewed from './notification-enhanced-reviewed';

export default { title: 'components / notification' };

export const base = () => {
	return ({
		template: `
            <notification-reviewed class="is-light is-success">
                You have successfully linked one asset.
            </notification-reviewed>

            <notification-reviewed class="is-light is-warning">
                An error occurred while processing your request. Please try again.
            </notification-reviewed>

            <notification-reviewed class="is-light is-danger">
                An error occurred while processing your request. Please try again.
            </notification-reviewed>
            
            <notification-reviewed class="is-danger">
                It should be dark
            </notification-reviewed>
		`,
		components: { NotificationReviewed },
	});
};

export const Enhanced = () => {
	return ({
		template: `
            <notification-enhanced-reviewed class="is-success">
                Primar lorem ipsum dolor sit amet, consectetur
                adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            </notification-enhanced-reviewed>
            
            <notification-enhanced-reviewed class="is-warning">
                Primar lorem ipsum dolor sit amet, consectetur
                adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            </notification-enhanced-reviewed>
		`,
		components: { NotificationEnhancedReviewed },
	});
};