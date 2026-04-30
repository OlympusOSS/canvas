import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>How do I get started?</AccordionTrigger>
					<AccordionContent>
						Sign up, complete your profile, and start a project from the dashboard.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
					<AccordionContent>Major credit cards, PayPal, and bank transfer.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
					<AccordionContent>
						Yes — your access continues to the end of the billing period.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
