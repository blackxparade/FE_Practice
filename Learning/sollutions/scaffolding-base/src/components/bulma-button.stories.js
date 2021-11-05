import BulmaButton from './bulma-button';
import { tdExample } from 'src/example-font-awesome-icon-pack';

export default { title: 'components / button' }

export const base = () => {
    return ({
        template: `
            <bulma-button class="is-primary mr-4">
                Click me
            </bulma-button>
            <bulma-button class="is-warning is-loading mr-4" />
        `,
        components: { BulmaButton }
    });
};

export const withIcon = () => {
    return ({
        template: `
            <bulma-button class="is-link is-light mr-4">
                <span class="icon">
                    <td-icon :icon="tdExample" />
                </span>
                <span>Label</span>
            </bulma-button>

            <bulma-button class="is-danger is-outlined">
                <span>Label</span>
                <span class="icon">
                    <td-icon :icon="tdExample" />
                </span>
            </bulma-button>
        `,
        components: { BulmaButton },
        setup() {
            return {
                tdExample
            };
        }
    });
};