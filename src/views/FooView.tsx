import * as React from 'react';
import { RouteComponentProps } from 'react-router';


export default class FooView extends React.Component<RouteComponentProps, any> {

    constructor(props: RouteComponentProps) {
        super(props);
    }

    onGotoBarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Navigating to Bar view");
        this.props.history.push("/bar");
    };

    public render() {
        return (
            <div>
                <h3>FOO View</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id officiis, quos temporibus quidem aliquid provident illo doloribus quod dicta perspiciatis dolores laborum vero laboriosam. Facere voluptatem eligendi magni nesciunt molestias.
                </p>
                <button onClick={this.onGotoBarClick}>Go to Bar</button>
            </div>
        );
    }
}
