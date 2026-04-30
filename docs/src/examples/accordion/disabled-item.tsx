import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="active">
					<AccordionTrigger>Open this</AccordionTrigger>
					<AccordionContent>This item is enabled.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="disabled" disabled>
					<AccordionTrigger>Coming soon</AccordionTrigger>
					<AccordionContent>You shouldn't see this.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
